import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Result from "./pages/Result";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

// 🔥 Animation Wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

// 🔥 Routes with animation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

        {/* App */}
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/analyze" element={<PageWrapper><Analyze /></PageWrapper>} />
        <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />
        <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
        <Route path="/insights" element={<PageWrapper><Insights /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />

        {/* Fallback */}
        <Route path="*" element={<PageWrapper><Landing /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// 🔥 Main App
export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}