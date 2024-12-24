import { useState } from "react";
import styles from "./LeftSection.module.css";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function LeftSection({ saveItem, loading }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`${styles.camera_container} ${
        isExpanded ? styles.full_screen : ""
      }`}
    >
      <div className={styles.icon_top_wrapper} onClick={toggleExpand}>
        <img src="/images/4.svg" alt="icon" />
      </div>
      <div className={styles.icons_bottom_wrapper}>
        <ReplayOutlinedIcon className={styles.icon_refresh} />
        <div className={styles.wrap_camera}>
          <CameraOutlinedIcon className={styles.icon_camera} />
        </div>
        <div className={styles.wrap_save_icon}>
          {saveItem && (
            <button
              className={`${styles.button_save} ${
                loading && styles.btn_save_disable
              }`}
              onClick={saveItem}
              disabled={loading}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            >
              <SaveAltIcon className={styles.icon_camera} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
