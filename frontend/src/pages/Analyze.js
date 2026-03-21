import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { analyzeCandidate, openAnalysisStream } from "../lib/api";
import { getSkillName, normalizeGapItems } from "../lib/analysis";
import { readResumeFile } from "../lib/resumeUpload";

const initialStreamState = {
  steps: [],
  snapshots: {},
  result: null,
  error: "",
};

export default function Analyze() {
  const navigate = useNavigate();
  const streamRef = useRef(null);

  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [mode, setMode] = useState("stream");
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [streamState, setStreamState] = useState(initialStreamState);

  useEffect(() => {
    return () => {
      streamRef.current?.close();
    };
  }, []);

  const resetStream = () => {
    streamRef.current?.close();
    setStreamState(initialStreamState);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingResume(true);
    setUploadedFileName(file.name);

    try {
      const extractedText = await readResumeFile(file);
      if (!extractedText) {
        throw new Error("The uploaded file did not contain readable text.");
      }

      setResume(extractedText);
    } catch (error) {
      console.error(error);
      setUploadedFileName("");
      alert(error.message || "Could not read the uploaded resume.");
    } finally {
      setUploadingResume(false);
      event.target.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!resume.trim() && !jd.trim()) {
      alert("Please add a resume or a job description.");
      return;
    }

    setLoading(true);
    resetStream();

    try {
      if (mode === "standard") {
        const data = await analyzeCandidate({
          resume,
          job_description: jd,
        });

        navigate("/result", { state: { data } });
        return;
      }

      streamRef.current = openAnalysisStream(
        { resume, job_description: jd },
        {
          onMessage: (message) => {
            if (message.event === "step") {
              setStreamState((current) => ({
                ...current,
                steps: [...current.steps, message.data],
              }));
              return;
            }

            if (message.event === "snapshot") {
              setStreamState((current) => ({
                ...current,
                snapshots: {
                  ...current.snapshots,
                  [message.data.type]: message.data,
                },
              }));
              return;
            }

            if (message.event === "result") {
              streamRef.current?.close();
              setStreamState((current) => ({
                ...current,
                result: message.data,
              }));
              setLoading(false);
            }
          },
          onError: (error) => {
            setStreamState((current) => ({
              ...current,
              error: error.message,
            }));
            setLoading(false);
          },
        }
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong. Check backend.");
      setLoading(false);
    }
  };

  const streamedSkills =
    streamState.snapshots.skills?.skills ||
    streamState.result?.skills ||
    [];
  const requiredSkills =
    streamState.snapshots.required_skills?.required_skills ||
    streamState.result?.required_skills ||
    [];
  const missingSkills =
    streamState.snapshots.missing_skills?.missing_skills ||
    streamState.result?.missing_skills ||
    [];
  const graphSkills =
    streamState.snapshots.graph?.graph_skills ||
    streamState.result?.graph_skills ||
    [];
  const graphDependencies =
    streamState.snapshots.graph?.graph_dependencies ||
    streamState.result?.graph_dependencies ||
    {};
  const roadmap =
    streamState.snapshots.roadmap?.roadmap ||
    streamState.result?.roadmap ||
    [];
  const finalGaps = normalizeGapItems(
    streamState.snapshots.gaps?.gaps || streamState.result?.gaps || []
  );

  return (
    <div style={styles.page}>
      <div style={styles.nav}>
        <h3
          style={styles.logo}
          onClick={() => navigate("/dashboard")}
        >
          Onboard
        </h3>

        <div style={styles.navRight}>
          <span style={styles.navItem} onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span style={{ ...styles.navItem, fontWeight: "600" }}>Analyze</span>
          <span style={styles.navItem} onClick={() => navigate("/history")}>
            History
          </span>
          <span style={styles.navItem} onClick={() => navigate("/insights")}>
            Insights
          </span>
        </div>
      </div>

      <div style={styles.layout}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.card}
        >
          <h2 style={styles.title}>Analyze Candidate</h2>
          <p style={styles.subtitle}>
            Use one-click analysis or stream the full agent workflow live.
          </p>

          <div style={styles.modeRow}>
            <ModeButton
              active={mode === "stream"}
              label="Analyze Stream"
              onClick={() => setMode("stream")}
            />
            <ModeButton
              active={mode === "standard"}
              label="Analyze Only"
              onClick={() => setMode("standard")}
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.uploadCard}>
              <div>
                <h4 style={styles.uploadTitle}>Upload Resume</h4>
                <p style={styles.uploadSubtitle}>
                  Supports PDF, DOCX, and TXT files. Resume text is optional if you upload it here.
                </p>
              </div>

              <label style={styles.uploadButton}>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md,.rtf,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={styles.hiddenInput}
                  onChange={handleResumeUpload}
                  disabled={uploadingResume || loading}
                />
                {uploadingResume ? "Reading file..." : "Choose File"}
              </label>
            </div>

            {uploadedFileName ? (
              <p style={styles.uploadedFile}>Loaded: {uploadedFileName}</p>
            ) : null}

            <textarea
              placeholder="Paste resume or upload a file..."
              value={resume}
              onChange={(event) => setResume(event.target.value)}
              style={styles.textarea}
            />

            <textarea
              placeholder="Paste job description... optional"
              value={jd}
              onChange={(event) => setJd(event.target.value)}
              style={styles.textarea}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={styles.primaryButton}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading
              ? mode === "stream"
                ? "Streaming analysis..."
                : "Analyzing..."
              : mode === "stream"
              ? "Start Analyze Stream"
              : "Run Analyze"}
          </motion.button>

          {streamState.error ? (
            <p style={styles.error}>{streamState.error}</p>
          ) : null}

          {streamState.result ? (
            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/result", { state: { data: streamState.result } })}
            >
              Open final result
            </button>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={styles.streamPanel}
        >
          <div style={styles.panelHeader}>
            <div>
              <h3 style={styles.panelTitle}>Live Workflow</h3>
              <p style={styles.panelSubtitle}>
                Stream mode shows agent steps plus the evolving graph output.
              </p>
            </div>
            <span style={styles.statusBadge}>
              {loading ? "Running" : streamState.result ? "Complete" : "Idle"}
            </span>
          </div>

          <div style={styles.stepList}>
            {streamState.steps.length === 0 ? (
              <p style={styles.placeholder}>
                Start an analyze stream to watch each FastAPI step in real time.
              </p>
            ) : (
              streamState.steps.map((step, index) => (
                <div key={`${step.label}-${index}`} style={styles.stepCard}>
                  <span style={styles.stepIndex}>{index + 1}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p style={styles.stepMessage}>{step.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={styles.graphGrid}>
            <GraphCard
              title="Detected Skills"
              items={streamedSkills.map((skill) => `${getSkillName(skill)}${skill.level ? ` (${skill.level})` : ""}`)}
            />
            <GraphCard title="Required Skills" items={requiredSkills} />
            <GraphCard title="Missing Skills" items={missingSkills} danger />
            <GraphCard title="Graph Output" items={graphSkills} highlight />
          </div>

          <div style={styles.dependencyCard}>
            <h4 style={styles.sectionTitle}>Graph Dependencies</h4>
            {Object.keys(graphDependencies).length === 0 ? (
              <p style={styles.placeholder}>No dependency expansion was produced yet.</p>
            ) : (
              Object.entries(graphDependencies).map(([skill, dependencies]) => (
                <div key={skill} style={styles.dependencyRow}>
                  <strong>{skill}</strong>
                  <span>{dependencies.join(", ") || "No mapped dependencies"}</span>
                </div>
              ))
            )}
          </div>

          <div style={styles.bottomGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.sectionTitle}>Final Gap Plan</h4>
              {finalGaps.length === 0 ? (
                <p style={styles.placeholder}>Gaps will appear here during the level engine step.</p>
              ) : (
                finalGaps.map((gap) => (
                  <div key={`${gap.skill}-${gap.step}`} style={styles.barRow}>
                    <span>{gap.skill}</span>
                    <div style={styles.barTrack}>
                      <div
                        style={{
                          ...styles.barFill,
                          width: `${Math.max(24, 100 - (gap.step - 1) * 12)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={styles.infoCard}>
              <h4 style={styles.sectionTitle}>Roadmap</h4>
              {roadmap.length === 0 ? (
                <p style={styles.placeholder}>Roadmap steps will show up once the path agent completes.</p>
              ) : (
                roadmap.map((step, index) => (
                  <div key={`${step.skill}-${index}`} style={styles.roadmapRow}>
                    <span style={styles.roadmapIndex}>{step.step || index + 1}</span>
                    <span>{step.skill || step}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ModeButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles.modeButton,
        ...(active ? styles.modeButtonActive : {}),
      }}
    >
      {label}
    </button>
  );
}

function GraphCard({ title, items, danger, highlight }) {
  return (
    <div style={styles.graphCard}>
      <h4 style={styles.sectionTitle}>{title}</h4>
      {items.length === 0 ? (
        <p style={styles.placeholder}>Waiting for data</p>
      ) : (
        <div style={styles.tagWrap}>
          {items.map((item) => (
            <span
              key={item}
              style={{
                ...styles.tag,
                ...(danger ? styles.dangerTag : {}),
                ...(highlight ? styles.highlightTag : {}),
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    background:
      "radial-gradient(circle at top, rgba(255,216,155,0.45), transparent 30%), linear-gradient(180deg, #fff7e6 0%, #e7f2ff 100%)",
    color: "#1f2937",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
  },
  logo: {
    fontWeight: "700",
    fontSize: "18px",
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    gap: "20px",
  },
  navItem: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#374151",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 460px) minmax(420px, 1fr)",
    gap: "24px",
    padding: "0 32px 32px",
  },
  card: {
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
    alignSelf: "start",
    position: "sticky",
    top: "24px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  uploadCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "18px",
    border: "1px solid #dde5ef",
    background: "#f8fafc",
  },
  uploadTitle: {
    margin: 0,
    fontSize: "15px",
  },
  uploadSubtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  uploadButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: "12px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  hiddenInput: {
    display: "none",
  },
  uploadedFile: {
    margin: "-4px 0 4px",
    color: "#047857",
    fontSize: "13px",
    fontWeight: "600",
  },
  modeRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  modeButton: {
    flex: 1,
    borderRadius: "999px",
    border: "1px solid #dbe3ef",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    fontWeight: "600",
  },
  modeButtonActive: {
    background: "#111827",
    color: "#ffffff",
    borderColor: "#111827",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  textarea: {
    minHeight: "170px",
    padding: "14px",
    borderRadius: "18px",
    border: "1px solid #dde5ef",
    fontSize: "14px",
    resize: "vertical",
    background: "#ffffff",
    outline: "none",
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #111827, #374151)",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },
  secondaryButton: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "16px",
    border: "1px solid #c7d2fe",
    background: "#eef2ff",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "#b91c1c",
    marginTop: "12px",
  },
  streamPanel: {
    padding: "24px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "18px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "22px",
  },
  panelSubtitle: {
    color: "#6b7280",
    marginTop: "8px",
  },
  statusBadge: {
    background: "#ecfeff",
    color: "#155e75",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  stepList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "18px",
  },
  stepCard: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  stepIndex: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#111827",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    flexShrink: 0,
  },
  stepMessage: {
    margin: "4px 0 0",
    color: "#6b7280",
  },
  graphGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginBottom: "14px",
  },
  graphCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: "12px",
    fontSize: "15px",
  },
  placeholder: {
    margin: 0,
    color: "#94a3b8",
    lineHeight: "1.5",
  },
  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tag: {
    padding: "7px 10px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: "600",
  },
  dangerTag: {
    background: "#fef2f2",
    color: "#b91c1c",
  },
  highlightTag: {
    background: "#ecfdf5",
    color: "#047857",
  },
  dependencyCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    marginBottom: "14px",
  },
  dependencyRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "10px 0",
    borderTop: "1px solid #f1f5f9",
    fontSize: "14px",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  },
  infoCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
  },
  barRow: {
    display: "grid",
    gridTemplateColumns: "110px 1fr",
    gap: "12px",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "14px",
  },
  barTrack: {
    width: "100%",
    height: "10px",
    borderRadius: "999px",
    background: "#e2e8f0",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
  },
  roadmapRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  roadmapIndex: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "#111827",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },
};
