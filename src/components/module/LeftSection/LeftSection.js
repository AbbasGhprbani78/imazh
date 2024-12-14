import styles from "./LeftSection.module.css";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

export default function LeftSection() {
  return (
    <div className={styles.camera_container}>
      <div className={styles.icon_top_wrapper}>
        <img src="/images/4.svg" alt="icon" />
      </div>
      <div className={styles.icons_bottom_wrapper}>
        <ReplayOutlinedIcon className={styles.icon_refresh} />
        <div className={styles.wrap_camera}>
          <CameraOutlinedIcon className={styles.icon_camera} />
        </div>
      </div>
    </div>
  );
}
