import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data;

  const skills = data?.skills || ["JavaScript", "React", "HTML"];
  const gaps = data?.gaps || ["System Design", "Docker"];
  const roadmap = data?.roadmap || [
    "Learn system design basics",
    "Build scalable backend",
    "Practice real-world projects"
  ];
  const reasoning =
    data?.reasoning ||
    "The candidate has strong frontend skills but lacks backend and system design knowledge.";

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
          <span onClick={() => navigate("/dashboard")} style={styles.navItem}>
            Dashboard
          </span>
          <span onClick={() => navigate("/analyze")} style={styles.navItem}>
            Analyze
          </span>
          <span onClick={() => navigate("/history")} style={styles.navItem}>
            History
          </span>
          <span onClick={() => navigate("/insights")} style={styles.navItem}>
            Insights
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.container}>
        <h1 style={styles.title}>AI Analysis</h1>

        <Section title="🧠 Skills Detected">
          <div style={styles.tags}>
            {skills.map((s, i) => (
              <Tag key={i} label={s} />
            ))}
          </div>
        </Section>

        <Section title="⚠️ Skill Gaps">
          <div style={styles.tags}>
            {gaps.map((g, i) => (
              <Tag key={i} label={g} danger />
            ))}
          </div>
        </Section>

        <Section title="🛣️ Learning Roadmap">
          <div style={styles.roadmap}>
            {roadmap.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={styles.step}
              >
                <span style={styles.stepIndex}>{i + 1}</span>
                <p>{step}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="🔍 AI Reasoning">
          <p style={styles.reasoning}>{reasoning}</p>
        </Section>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <motion.div whileHover={{ y: -2 }} style={styles.card}>
      <h3>{title}</h3>
      <div style={{ marginTop: "10px" }}>{children}</div>
    </motion.div>
  );
}

function Tag({ label, danger }) {
  return (
    <span
      style={{
        ...styles.tag,
        background: danger
          ? "rgba(255, 200, 200, 0.6)"
          : "rgba(255,255,255,0.7)",
      }}
    >
      {label}
    </span>
  );
}

/* STYLES */

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
    padding: "20px 40px",
  },

  logo: {
    fontWeight: "600",
  },

  navRight: {
    display: "flex",
    gap: "20px",
  },

  navItem: {
    cursor: "pointer",
    fontSize: "14px",
  },

  /* ✅ FIXED CONTAINER */
  container: {
    maxWidth: "800px",
    margin: "0 auto",          // 🔥 no vertical margin
    padding: "20px 20px 40px", // 🔥 bottom padding instead
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "600",
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
  },

  tag: {
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "12px",
    border: "1px solid rgba(255,255,255,0.6)",
  },

  roadmap: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  step: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  stepIndex: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },

  reasoning: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
};