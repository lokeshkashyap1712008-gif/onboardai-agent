import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>
      </div>

      {/* CENTER WRAPPER */}
      <div style={styles.center}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={styles.card}
        >
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Login to continue</p>

          <div style={styles.inputGroup}>
            <input placeholder="Email" style={styles.input} />
            <input placeholder="Password" type="password" style={styles.input} />
          </div>

          {/* 🔥 LIQUID PRIMARY BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -1,
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
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
            style={styles.liquidPrimary}
            onClick={() => navigate("/dashboard")}
          >
            Login
          </motion.button>

          {/* 🔥 SECONDARY GLASS BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={styles.liquidSecondary}
          >
            Continue with Google
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

  nav: {
    padding: "20px 40px",
  },

  logo: {
    fontWeight: "600",
    fontSize: "18px",
  },

  /* 🔥 PERFECT CENTERING */
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 80px)",
  },

  card: {
    width: "380px",
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
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.7)",
    outline: "none",
    fontSize: "14px",
  },

  /* 🔥 APPLE-STYLE LIQUID BUTTON */
  liquidPrimary: {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    color: "white",

    background: "linear-gradient(180deg, #4A8BFF, #2F6BFF)",

    boxShadow: `
      0 10px 30px rgba(47,107,255,0.35),
      inset 0 1px 0 rgba(255,255,255,0.4),
      inset 0 -2px 6px rgba(0,0,0,0.2)
    `,
  },

  /* 🔥 GLASS SECONDARY */
  liquidSecondary: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "14px",
    cursor: "pointer",

    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.6)",

    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  },
};