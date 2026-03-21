import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analyze", path: "/analyze" },
    { name: "History", path: "/history" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <div style={styles.navWrapper}>
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
          {navItems.map((item) => (
            <span
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path
                  ? styles.activeNavItem
                  : {}),
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  navWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.5)",
    borderBottom: "1px solid rgba(255,255,255,0.4)",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  logo: {
    fontWeight: "600",
    fontSize: "18px",
  },

  navRight: {
    display: "flex",
    gap: "18px",
  },

  navItem: {
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
    padding: "6px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },

  activeNavItem: {
    background: "rgba(255,255,255,0.7)",
    color: "#000",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
};
