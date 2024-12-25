import styles from "./RightSection.module.css";
export default function RightSection({ children, style }) {
  return <div className={`${styles.container} ${styles[style]}`}>{children}</div>;
}
