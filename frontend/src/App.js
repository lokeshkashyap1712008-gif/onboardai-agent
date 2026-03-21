import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resume,
          job_description: jd,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🚀 OnboardAI Agent</h1>

      <h3>Resume</h3>
      <textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Paste your resume..."
        rows={6}
        style={{ width: "100%" }}
      />

      <h3>Job Description</h3>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste job description..."
        rows={6}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={handleAnalyze}>
        Analyze
      </button>

      <br /><br />

      {loading && <p>🤖 AI Agents are thinking...</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;