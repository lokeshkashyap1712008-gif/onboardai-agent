import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function History() {
  const navigate = useNavigate();

  // 🔥 Dummy data (later connect to backend/localStorage)
  const historyData = [
    { role: "Frontend Developer", date: "Today" },
    { role: "Data Analyst", date: "Yesterday" },
    { role: "Backend Engineer", date: "2 days ago" },
  ];

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
          <span style={{ ...styles.navItem, fontWeight: "600" }}>
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
        <h1 style={styles.title}>History</h1>
        <p style={styles.subtitle}>View past analyses and results</p>

        {/* LIST */}
        <div style={styles.list}>
          {historyData.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.01,
                y: -2,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              style={styles.card}
              onClick={() => navigate("/result")}
            >
              <div>
                <h3 style={styles.role}>{item.role}</h3>
                <p style={styles.date}>{item.date}</p>
              </div>

              <span style={styles.arrow}>→</span>
            </motion.div>
          ))}
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
    maxWidth: "700px",
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

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px",
    borderRadius: "16px",

    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",

    cursor: "pointer",
  },

  role: {
    fontSize: "16px",
    fontWeight: "500",
  },

  date: {
    fontSize: "12px",
    color: "#777",
  },

  arrow: {
    fontSize: "18px",
    opacity: 0.6,
  },
};