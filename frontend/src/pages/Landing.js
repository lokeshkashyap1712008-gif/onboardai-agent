import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={styles.liquidBtnSmall}
            onClick={() => handleNavigate("/login")}
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={styles.liquidBtnSmall}
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </motion.button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Adaptive onboarding
          <br />
          for every hire
        </h1>

        <p style={styles.subtitle}>
          Understand skills. Identify gaps. Build personalized learning paths.
        </p>

        {/* INPUT CTA */}
        <div style={styles.inputBox}>
          <input
            placeholder="Paste a resume or job description..."
            style={styles.input}
          />

          <motion.button
            whileHover={{
              scale: 1.04,
              y: -1,
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            style={styles.liquidBtn}
            onClick={() => handleNavigate("/analyze")}
          >
            Analyze →
          </motion.button>
        </div>

        <p style={styles.trust}>
          Built for intelligent onboarding • Designed for clarity
        </p>
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
    gap: "10px",
  },

  /* 🔥 UNIFIED SMALL BUTTON */
  liquidBtnSmall: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backdropFilter: "blur(18px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.6)",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",

    boxShadow: `
      0 6px 16px rgba(0,0,0,0.06),
      inset 0 1px 0 rgba(255,255,255,0.7)
    `,
  },

  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "120px",
  },

  title: {
    fontSize: "64px",
    lineHeight: "1.1",
    fontWeight: "600",
    letterSpacing: "-1px",
  },

  subtitle: {
    marginTop: "16px",
    fontSize: "18px",
    color: "#555",
  },

  inputBox: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    backdropFilter: "blur(14px)",
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "14px",
    padding: "6px",
    width: "520px",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    padding: "10px",
    outline: "none",
    fontSize: "14px",
    color: "#1a1a1a",
  },

  /* 🔥 MAIN BUTTON (SAME STYLE, JUST BIGGER) */
  liquidBtn: {
    padding: "10px 18px",
    borderRadius: "12px",
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

  trust: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#777",
  },
};