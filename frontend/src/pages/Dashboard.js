import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
        <span style={{ ...styles.navItem, fontWeight: "600" }}>
            Dashboard
          </span>
          <span style={styles.navItem} onClick={() => navigate("/analyze")}>
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
      <div style={styles.container}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>
            Track onboarding insights and skill analysis
          </p>
        </motion.div>

        {/* STATS */}
        <div style={styles.grid}>
          {["Skills Analyzed", "Gaps Found", "Reports Generated"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              style={styles.card}
            >
              <p style={styles.cardTitle}>{item}</p>
              <h2 style={styles.cardValue}>{Math.floor(Math.random() * 50) + 5}</h2>
            </motion.div>
          ))}
        </div>

        {/* ACTION */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={styles.actionCard}
          onClick={() => navigate("/analyze")}
        >
          <h3>Start New Analysis →</h3>
        </motion.div>

        {/* RECENT */}
        <div style={styles.section}>
          <h3>Recent Analyses</h3>

          <div style={styles.list}>
            {["Frontend Developer", "Data Analyst", "Backend Engineer"].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                style={styles.listItem}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
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
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "30px",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },

  cardTitle: {
    fontSize: "13px",
    color: "#666",
  },

  cardValue: {
    marginTop: "6px",
    fontSize: "24px",
  },

  actionCard: {
    padding: "20px",
    borderRadius: "16px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",
    cursor: "pointer",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },

  section: {
    marginTop: "20px",
  },

  list: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  listItem: {
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(255,255,255,0.6)",
    cursor: "pointer",
  },
};