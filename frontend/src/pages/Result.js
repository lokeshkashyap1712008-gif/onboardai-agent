import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { formatAnalysisDate, getSkillName, normalizeGapItems } from "../lib/analysis";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data || {};
  const skills = data.skills || [];
  const requiredSkills = data.required_skills || [];
  const missingSkills = data.missing_skills || [];
  const graphSkills = data.graph_skills || [];
  const gaps = normalizeGapItems(data.gaps || []);
  const roadmap = normalizeGapItems(data.roadmap || []);
  const trace = data.decision_trace || [];
  const savedRecord = data.saved_record || data.database?.record || null;
  const createdAt = savedRecord?.created_at || data.created_at;

  return (
    <div style={styles.page}>
      <div style={styles.nav}>
        <h3 style={styles.logo}>Onboard</h3>

        <div style={styles.navRight}>
          <span onClick={() => navigate("/dashboard")} style={styles.navItem}>
            Dashboard
          </span>
          <span onClick={() => navigate("/analyze")} style={styles.navItem}>
            Analyze
          </span>
          <span onClick={() => navigate("/history")} style={styles.navItem}>
            History
          </span>
          <span onClick={() => navigate("/insights")} style={styles.navItem}>
            Insights
          </span>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.headerCard}>
          <div>
            <h1 style={styles.title}>AI Analysis Result</h1>
            <p style={styles.subtitle}>
              {createdAt ? formatAnalysisDate(createdAt) : "Fresh analysis result"}
            </p>
          </div>

          <div style={styles.headerMeta}>
            <span style={styles.metaPill}>
              {data.database?.saved || data.id ? "Saved to Supabase" : "Unsaved"}
            </span>
            {savedRecord?.id || data.id ? (
              <span style={styles.metaPillMuted}>Record {savedRecord?.id || data.id}</span>
            ) : null}
          </div>
        </div>

        <div style={styles.grid}>
          <Section title="Detected Skills">
            <TagList
              items={skills.map((skill) =>
                `${getSkillName(skill)}${skill.level ? ` (${skill.level})` : ""}`
              )}
            />
          </Section>

          <Section title="Required Skills">
            <TagList items={requiredSkills} highlight />
          </Section>

          <Section title="Missing Skills">
            <TagList items={missingSkills} danger />
          </Section>

          <Section title="Graph Expanded Skills">
            <TagList items={graphSkills} success />
          </Section>
        </div>

        <Section title="Gap Priorities">
          {gaps.length === 0 ? (
            <p style={styles.empty}>No gaps were produced for this analysis.</p>
          ) : (
            <div style={styles.roadmap}>
              {gaps.map((item, index) => (
                <motion.div
                  key={`${item.skill}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={styles.step}
                >
                  <span style={styles.stepIndex}>{item.step || index + 1}</span>
                  <p style={styles.stepText}>{item.skill}</p>
                </motion.div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Learning Roadmap">
          {roadmap.length === 0 ? (
            <p style={styles.empty}>No roadmap steps were generated.</p>
          ) : (
            <div style={styles.roadmap}>
              {roadmap.map((step, index) => (
                <motion.div
                  key={`${step.skill}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={styles.step}
                >
                  <span style={styles.stepIndex}>{step.step || index + 1}</span>
                  <p style={styles.stepText}>{step.skill}</p>
                </motion.div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Decision Trace">
          {trace.length === 0 ? (
            <p style={styles.empty}>No reasoning trace is available.</p>
          ) : (
            <div style={styles.traceList}>
              {trace.map((item, index) => (
                <div key={`${item}-${index}`} style={styles.traceItem}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div whileHover={{ y: -2 }} style={styles.card}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div>{children}</div>
    </motion.div>
  );
}

function TagList({ items, danger, highlight, success }) {
  if (!items.length) {
    return <p style={styles.empty}>No data available.</p>;
  }

  return (
    <div style={styles.tags}>
      {items.map((label) => (
        <span
          key={label}
          style={{
            ...styles.tag,
            ...(danger ? styles.tagDanger : {}),
            ...(highlight ? styles.tagHighlight : {}),
            ...(success ? styles.tagSuccess : {}),
          }}
        >
          {label}
        </span>
      ))}
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
    padding: "20px 40px",
  },
  logo: {
    fontWeight: "600",
  },
  navRight: {
    display: "flex",
    gap: "20px",
  },
  navItem: {
    cursor: "pointer",
    fontSize: "14px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px 20px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(255,255,255,0.8)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: 0,
  },
  subtitle: {
    marginTop: "8px",
    color: "#64748b",
  },
  headerMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  metaPill: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: "700",
  },
  metaPillMuted: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#e2e8f0",
    color: "#334155",
    fontSize: "12px",
    fontWeight: "700",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    marginTop: 0,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tag: {
    padding: "6px 10px",
    borderRadius: "10px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: "600",
  },
  tagDanger: {
    background: "#fee2e2",
    color: "#b91c1c",
  },
  tagHighlight: {
    background: "#fef3c7",
    color: "#92400e",
  },
  tagSuccess: {
    background: "#dcfce7",
    color: "#166534",
  },
  roadmap: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  stepIndex: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "rgba(15,23,42,0.9)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    flexShrink: 0,
  },
  stepText: {
    margin: 0,
  },
  traceList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  traceItem: {
    padding: "10px 12px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    color: "#334155",
  },
  empty: {
    color: "#64748b",
    margin: 0,
  },
};
