import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>
      </div>

      {/* CENTER */}
      <div style={styles.center}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={styles.card}
        >
          <h2 style={styles.title}>Create account</h2>
          <p style={styles.subtitle}>Start your onboarding journey</p>

          <div style={styles.inputGroup}>
            <input placeholder="Full Name" style={styles.input} />
            <input placeholder="Email" style={styles.input} />
            <input placeholder="Password" type="password" style={styles.input} />
          </div>

          {/* 🔥 PRIMARY BUTTON */}
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
            onClick={() => navigate("/dashboard")}
          >
            Sign Up
          </motion.button>

          {/* 🔥 SECONDARY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={styles.liquidBtnSecondary}
          >
            Continue with Google
          </motion.button>

          {/* SWITCH */}
          <p style={styles.switch}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={styles.link}>
              Login
            </span>
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
    padding: "20px 40px",
  },

  logo: {
    fontWeight: "600",
    fontSize: "18px",
  },

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

  /* 🔥 SAME BUTTON SYSTEM AS LANDING */
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

  liquidBtnSecondary: {
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

  switch: {
    marginTop: "16px",
    fontSize: "13px",
    color: "#666",
    textAlign: "center",
  },

  link: {
    cursor: "pointer",
    fontWeight: "500",
  },
};