import React, { useState } from "react";
import styles from "./ListActionMedia.module.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
export default function ListActionMedia({
  downloadMedia,
  fullScreenOne,
  fullScreenTwo,
  showIconTakeImageFromVideo,
  isfullScreen,
}) {
  const [showList, setShowList] = useState(false);
  return (
    <>
      <div
        className={styles.icon_info_wrapper}
        onClick={() => setShowList((prev) => !prev)}
      >
        <MoreHorizOutlinedIcon />
      </div>

      <ul className={`${styles.list_actions} ${showList && styles.active}`}>
        <li className={styles.item_action} onClick={downloadMedia}>
          <img src="/images/9.svg" alt="icon" />
          دانلود
        </li>
        {fullScreenOne && (
          <li
            className={styles.item_action}
            onClick={() => {
              fullScreenOne();
              setShowList(false);
            }}
          >
            <img src="/images/12.svg" alt="icon" />
            بزرگنمایی
          </li>
        )}
        {fullScreenTwo && (
          <li
            className={styles.item_action}
            onClick={() => {
              fullScreenTwo();
              setShowList(false);
            }}
          >
            <img src="/images/10.svg" alt="icon" />
            {isfullScreen ? "حالت نرمال" : "بزرگنمایی همزمان"}
          </li>
        )}
        {showIconTakeImageFromVideo && (
          <li
            className={styles.item_action}
            onClick={() => {
              showIconTakeImageFromVideo();
              setShowList(false);
            }}
          >
            <img src="/images/11.svg" alt="icon" />
            عکسبرداری از ویدیو
          </li>
        )}
      </ul>
    </>
  );
}
