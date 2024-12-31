import React from "react";
import styles from "./ModalBottom.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export default function ModalBottom({ children, isVisible, setIsVisible }) {
  return (
    <div
      className={`${styles.modal_bottom_container} ${
        isVisible ? styles.show : styles.hide
      }`}
    >
      <div className={styles.wrap_icon}>
        <ArrowBackIosNewIcon
          className={styles.icon}
          onClick={() => setIsVisible(false)}
        />
      </div>
      <div className={styles.contnet_modal_bottom}>{children}</div>
    </div>
  );
}
