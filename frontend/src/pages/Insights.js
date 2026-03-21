import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Insights() {
  const navigate = useNavigate();

  // 🔥 Dummy data (replace later with backend)
  const topSkills = ["JavaScript", "React", "Python", "SQL"];
  const skillGaps = ["System Design", "Docker", "DSA", "Testing"];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
        <span style={styles.navItem} onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span style={styles.navItem} onClick={() => navigate("/analyze")}>
            Analyze
          </span>
          <span style={styles.navItem} onClick={() => navigate("/history")}>
            History
          </span>
          <span style={{ ...styles.navItem, fontWeight: "600" }}>
            Insights
          </span>
          <span style={styles.navItem} onClick={() => navigate("/settings")}>
            Settings
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.container}>
        <h1 style={styles.title}>Insights</h1>
        <p style={styles.subtitle}>
          AI-generated patterns from analyzed candidates
        </p>

        {/* GRID */}
        <div style={styles.grid}>
          {/* 🔥 TOP SKILLS */}
          <motion.div
            whileHover={{ y: -2 }}
            style={styles.card}
          >
            <h3>Top Skills Detected</h3>

            <div style={styles.tags}>
              {topSkills.map((skill, i) => (
                <span key={i} style={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 🔥 SKILL GAPS */}
          <motion.div
            whileHover={{ y: -2 }}
            style={styles.card}
          >
            <h3>Most Common Gaps</h3>

            <div style={styles.tags}>
              {skillGaps.map((gap, i) => (
                <span key={i} style={styles.tag}>
                  {gap}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 🔥 AI SUMMARY */}
        <motion.div
          whileHover={{ y: -2 }}
          style={styles.summaryCard}
        >
          <h3>AI Insight</h3>

          <p style={styles.summaryText}>
            Most candidates show strong frontend skills but lack system design
            and backend scalability knowledge. Learning paths should prioritize
            architecture fundamentals and real-world system building.
          </p>
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

  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 20px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "600",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",

    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",

    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },

  tag: {
    padding: "6px 10px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.6)",
    fontSize: "12px",
  },

  summaryCard: {
    padding: "20px",
    borderRadius: "16px",

    background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",

    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },

  summaryText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
};