import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={styles.page}>
      {/* ✅ EXACT SAME NAVBAR */}
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
          <span style={styles.navItem} onClick={() => navigate("/insights")}>
            Insights
          </span>
          <span style={{ ...styles.navItem, fontWeight: "600" }}>
            Settings
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.container}>
        <h1 style={styles.title}>Settings</h1>
        <p style={styles.subtitle}>Manage your preferences</p>

        {/* PROFILE */}
        <motion.div style={styles.card} whileHover={{ y: -2 }}>
          <h3>Profile</h3>
          <input placeholder="Name" style={styles.input} />
          <input placeholder="Email" style={styles.input} />
        </motion.div>

        {/* PREFERENCES */}
        <motion.div style={styles.card} whileHover={{ y: -2 }}>
          <h3>Preferences</h3>

          <div style={styles.toggleRow}>
            <span>Dark Mode</span>
            <Toggle active={darkMode} setActive={setDarkMode} />
          </div>

          <div style={styles.toggleRow}>
            <span>Notifications</span>
            <Toggle active={notifications} setActive={setNotifications} />
          </div>
        </motion.div>

        {/* ACTIONS */}
        <motion.div style={styles.card} whileHover={{ y: -2 }}>
          <h3>Actions</h3>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={styles.btn}
          >
            Reset Data
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={styles.btnDanger}
            onClick={() => navigate("/")}
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

/* TOGGLE */
function Toggle({ active, setActive }) {
  return (
    <div
      onClick={() => setActive(!active)}
      style={{
        width: "40px",
        height: "20px",
        borderRadius: "20px",
        background: active ? "#ddd" : "#bbb",
        position: "relative",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "white",
          position: "absolute",
          top: "2px",
          left: active ? "22px" : "2px",
          transition: "0.2s",
        }}
      />
    </div>
  );
}

/* STYLES — SAME SYSTEM */
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
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "600",
  },

  subtitle: {
    color: "#666",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.7)",
    outline: "none",
  },

  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btn: {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.8)",
    cursor: "pointer",
  },

  btnDanger: {
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid rgba(255,200,200,0.6)",
    background: "rgba(255,200,200,0.5)",
    cursor: "pointer",
  },
};