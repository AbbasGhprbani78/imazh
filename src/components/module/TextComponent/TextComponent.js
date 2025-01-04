import React from "react";
import styles from "./Text.module.css";
export default function TextComponent({ text, lable }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.lable}>{lable}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
