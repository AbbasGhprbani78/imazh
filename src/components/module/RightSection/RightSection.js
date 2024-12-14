import styles from "./RightSection.module.css";
export default function RightSection({ children }) {
  return <div className={styles.container}>{children}</div>;
}
