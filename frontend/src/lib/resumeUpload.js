import mammoth from "mammoth";

let pdfWorkerConfigured = false;

async function loadPdfDocument(data, disableWorker = false) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

  if (!pdfWorkerConfigured && !disableWorker) {
    try {
      pdfjs.GlobalWorkerOptions.workerPort = new Worker(
        new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url),
        { type: "module" }
      );
      pdfWorkerConfigured = true;
    } catch (error) {
      pdfWorkerConfigured = false;
    }
  }

  return pdfjs.getDocument({ data, disableWorker }).promise;
}

async function extractTextFromPdf(file) {
  const data = await file.arrayBuffer();
  let pdf;

  try {
    pdf = await loadPdfDocument(data);
  } catch (error) {
    pdf = await loadPdfDocument(data, true);
  }

  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const text = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    if (text) {
      pages.push(text);
    }
  }

  return pages.join("\n\n");
}

async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

async function extractTextFromPlainFile(file) {
  return (await file.text()).trim();
}

export async function readResumeFile(file) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (extension === "pdf") {
    return extractTextFromPdf(file);
  }

  if (extension === "docx") {
    return extractTextFromDocx(file);
  }

  if (["txt", "md", "rtf"].includes(extension) || file.type.startsWith("text/")) {
    return extractTextFromPlainFile(file);
  }

  throw new Error("Unsupported file type. Upload a PDF, DOCX, or TXT resume.");
}
