import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchHistory } from "../lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    gaps: 0,
    skills: 0,
  });

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const history = await fetchHistory();
        if (!active) {
          return;
        }

        setStats({
          total: history.length,
          gaps: history.reduce((acc, item) => acc + (item.gaps?.length || 0), 0),
          skills: history.reduce((acc, item) => acc + (item.skills?.length || 0), 0),
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
          <span style={{ ...styles.navItem, fontWeight: "600" }}>Dashboard</span>
          <span style={styles.navItem} onClick={() => navigate("/analyze")}>
            Analyze
          </span>
          <span style={styles.navItem} onClick={() => navigate("/history")}>
            History
          </span>
          <span style={styles.navItem} onClick={() => navigate("/insights")}>
            Insights
          </span>
        </div>
      </div>

      <div style={styles.container}>
        <h1 style={styles.heading}>Dashboard</h1>
        <p style={styles.subheading}>Live Supabase-backed analysis metrics.</p>

        <div style={styles.grid}>
          <Card title="Analyses" value={stats.total} />
          <Card title="Total Gaps" value={stats.gaps} />
          <Card title="Skills Detected" value={stats.skills} />
        </div>

        <div style={styles.action} onClick={() => navigate("/analyze")}>
          Start New Analysis
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    background: "linear-gradient(180deg, #fff7e6 0%, #eaf3ff 100%)",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
  },
  logo: {
    fontWeight: "700",
  },
  navRight: {
    display: "flex",
    gap: "20px",
  },
  navItem: {
    cursor: "pointer",
  },
  container: {
    maxWidth: "860px",
    margin: "40px auto",
    padding: "0 20px",
  },
  heading: {
    fontSize: "34px",
    marginBottom: "8px",
  },
  subheading: {
    color: "#64748b",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
  },
  card: {
    padding: "22px",
    background: "rgba(255,255,255,0.68)",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.75)",
  },
  cardTitle: {
    margin: 0,
    color: "#64748b",
  },
  cardValue: {
    marginBottom: 0,
  },
  action: {
    marginTop: "24px",
    padding: "20px",
    cursor: "pointer",
    borderRadius: "18px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
};
