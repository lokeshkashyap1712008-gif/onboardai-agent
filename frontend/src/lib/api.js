const explicitBaseUrl = (process.env.REACT_APP_API_BASE_URL || "").trim();

function getDefaultApiBaseUrl() {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:8000`;
}

const API_BASE_URL = explicitBaseUrl || getDefaultApiBaseUrl();

async function parseJsonResponse(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.detail || data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export async function analyzeCandidate(payload) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(response);
}

export async function fetchHistory(limit = 50) {
  const response = await fetch(`${API_BASE_URL}/history?limit=${limit}`);
  const data = await parseJsonResponse(response);
  return data?.items || [];
}

export async function fetchAnalysis(recordId) {
  const response = await fetch(`${API_BASE_URL}/history/${recordId}`);
  return parseJsonResponse(response);
}

export function openAnalysisStream(payload, handlers) {
  const params = new URLSearchParams({
    resume: payload.resume,
    job_description: payload.job_description,
  });
  const eventSource = new EventSource(
    `${API_BASE_URL}/analyze-stream?${params.toString()}`
  );

  eventSource.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handlers?.onMessage?.(message);
  };

  eventSource.onerror = () => {
    handlers?.onError?.(new Error("Streaming connection failed"));
    eventSource.close();
  };

  return eventSource;
}

export { API_BASE_URL };
