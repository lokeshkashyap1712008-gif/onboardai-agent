import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Analyze() {
  const navigate = useNavigate();

  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jd) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          job_description: jd,
        }),
      });

      const data = await response.json();

      navigate("/result", { state: { data } });
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      {/* 🔥 NAVBAR (SAME AS DASHBOARD) */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
        <span style={styles.navItem} onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span style={{ ...styles.navItem, fontWeight: "600" }}>
            Analyze
          </span>
          <span style={styles.navItem} onClick={() => navigate("/history")}>
            History
          </span>
          <span style={styles.navItem} onClick={() => navigate("/insights")}>
            Insights
          </span>
          <span style={styles.navItem} onClick={() => navigate("/settings")}>
            Settings
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.center}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          style={styles.card}
        >
          <h2 style={styles.title}>Analyze Candidate</h2>
          <p style={styles.subtitle}>
            Paste resume and job description to generate insights
          </p>

          <div style={styles.inputGroup}>
            <textarea
              placeholder="Paste resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={styles.textarea}
            />

            <textarea
              placeholder="Paste job description..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              style={styles.textarea}
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.035,
              y: -1,
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
            }}
            whileTap={{
              scale: 0.97,
              y: 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            style={styles.liquidBtn}
            onClick={handleAnalyze}
          >
            {loading ? "Analyzing..." : "Analyze →"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    background: "linear-gradient(180deg, #FFF7E6 0%, #EAF3FF 100%)",
    color: "#1a1a1a",
  },

  /* 🔥 NAVBAR */
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
  },

  logo: {
    fontWeight: "600",
    fontSize: "18px",
  },

  navRight: {
    display: "flex",
    gap: "20px",
  },

  navItem: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#444",
  },

  /* MAIN */
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 80px)",
  },

  card: {
    width: "600px",
    padding: "32px",
    borderRadius: "18px",

    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(25px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.6)",

    boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },

  textarea: {
    height: "120px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.7)",
    outline: "none",
    fontSize: "14px",
    resize: "none",
  },

  liquidBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontWeight: "500",

    background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backdropFilter: "blur(18px) saturate(160%)",

    boxShadow: `
      0 8px 20px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.7)
    `,
  },
};