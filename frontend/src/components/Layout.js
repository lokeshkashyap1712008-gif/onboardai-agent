import Navbar from "./Navbar";
import { styles } from "../styles";

export default function Layout({ children }) {
  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>{children}</div>
    </div>
  );
}