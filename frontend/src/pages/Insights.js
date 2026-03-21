import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchHistory } from "../lib/api";
import { summarizeInsights } from "../lib/analysis";

export default function Insights() {
  const navigate = useNavigate();
  const [topSkills, setTopSkills] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadInsights() {
      try {
        const items = await fetchHistory();
        if (!active) {
          return;
        }

        const summary = summarizeInsights(items);
        setTopSkills(summary.topSkills);
        setSkillGaps(summary.commonGaps);
      } catch (error) {
        console.error(error);
      }
    }

    loadInsights();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={styles.page}>
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
          <span style={{ ...styles.navItem, fontWeight: "600" }}>Insights</span>
        </div>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>Insights</h1>
        <p style={styles.subtitle}>
          Aggregated patterns across the analyses saved in Supabase.
        </p>

        <div style={styles.grid}>
          <motion.div whileHover={{ y: -2 }} style={styles.card}>
            <h3>Top Skills Detected</h3>
            <div style={styles.tags}>
              {topSkills.length === 0 ? (
                <p style={styles.empty}>Run more analyses to populate insights.</p>
              ) : (
                topSkills.map(([skill, count]) => (
                  <span key={skill} style={styles.tag}>
                    {skill} · {count}
                  </span>
                ))
              )}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} style={styles.card}>
            <h3>Most Common Gaps</h3>
            <div style={styles.tags}>
              {skillGaps.length === 0 ? (
                <p style={styles.empty}>Gap trends will appear here.</p>
              ) : (
                skillGaps.map(([gap, count]) => (
                  <span key={gap} style={styles.gapTag}>
                    {gap} · {count}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </div>

        <motion.div whileHover={{ y: -2 }} style={styles.summaryCard}>
          <h3>AI Insight</h3>
          <p style={styles.summaryText}>
            This view now reflects real stored analyses. As more candidate runs are
            saved, the dominant skills and repeated gaps update automatically.
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
    background: "linear-gradient(180deg, #fff7e6 0%, #eaf3ff 100%)",
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
    background: "rgba(219,234,254,0.9)",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: "600",
  },
  gapTag: {
    padding: "6px 10px",
    borderRadius: "10px",
    background: "rgba(254,226,226,0.9)",
    color: "#b91c1c",
    fontSize: "12px",
    fontWeight: "600",
  },
  empty: {
    color: "#64748b",
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
