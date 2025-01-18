import styles from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
export default function Modal({ title, children, onClick, showModal, height }) {
  return (
    <div
      className={`${styles.modal_container} ${showModal && styles.showModal}`}
    >
      <div className={styles.modal_close} onClick={onClick}></div>
      <div className={`${styles.contant} no-scrollbar`}>
        <div className={styles.top_modal}>
          <span className={styles.lable}>{title}</span>
          <CloseIcon className={styles.icon_close} onClick={onClick} />
        </div>
        <div className={`${styles.bottom_modal} ${styles[height]}`}>{children}</div>
      </div>
    </div>
  );
}
