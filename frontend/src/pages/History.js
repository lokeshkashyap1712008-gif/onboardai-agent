import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchHistory } from "../lib/api";
import { formatAnalysisDate, getAnalysisTitle } from "../lib/analysis";

export default function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        const historyItems = await fetchHistory();
        if (!active) {
          return;
        }

        setItems(historyItems);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(loadError.message || "Unable to load history");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHistory();

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
          <span style={{ ...styles.navItem, fontWeight: "600" }}>History</span>
          <span style={styles.navItem} onClick={() => navigate("/insights")}>
            Insights
          </span>
        </div>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>Analysis History</h1>
        <p style={styles.subtitle}>
          Live records loaded from FastAPI and Supabase.
        </p>

        {loading ? <p style={styles.message}>Loading history...</p> : null}
        {error ? <p style={styles.error}>{error}</p> : null}

        {!loading && !error && items.length === 0 ? (
          <p style={styles.message}>
            No saved analyses yet. Run an analysis to populate this page.
          </p>
        ) : null}

        <div style={styles.list}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || `${getAnalysisTitle(item)}-${index}`}
              whileHover={{
                scale: 1.01,
                y: -2,
                boxShadow: "0 18px 30px rgba(15,23,42,0.08)",
              }}
              whileTap={{ scale: 0.99 }}
              style={styles.card}
              onClick={() => navigate("/result", { state: { data: item } })}
            >
              <div style={styles.cardBody}>
                <h3 style={styles.role}>{getAnalysisTitle(item)}</h3>
                <p style={styles.date}>{formatAnalysisDate(item.created_at)}</p>
                <p style={styles.meta}>
                  {item.skills?.length || 0} skills detected, {item.gaps?.length || 0} gaps mapped
                </p>
              </div>

              <span style={styles.arrow}>Open</span>
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
    background:
      "radial-gradient(circle at top left, rgba(255,224,178,0.42), transparent 25%), linear-gradient(180deg, #fff7e6 0%, #eaf3ff 100%)",
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
    maxWidth: "860px",
    margin: "20px auto",
    padding: "0 20px 40px",
  },
  title: {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "24px",
  },
  message: {
    color: "#64748b",
  },
  error: {
    color: "#b91c1c",
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
    gap: "14px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  role: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  date: {
    fontSize: "13px",
    color: "#64748b",
    margin: 0,
  },
  meta: {
    margin: 0,
    color: "#475569",
    fontSize: "14px",
  },
  arrow: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
    background: "#e2e8f0",
    padding: "8px 12px",
    borderRadius: "999px",
  },
};
