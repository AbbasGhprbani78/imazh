"use client"
import Button1 from "@/components/module/Buttons/Button1";
import Button2 from "@/components/module/Buttons/Button2";
import SearchBox from "@/components/module/SearchBox/SearchBox";
import TableUser from "@/components/module/Table/Table";
import React from "react";
import styles from './Archive.module.css'
import AddIcon from "@mui/icons-material/Add";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
export default function Archive() {
  return (
    <div className={`wrapper ${styles.container}`}>
      <div className={styles.top}>
        <span className={`title`}>آرشیو</span>
        <div className={styles.wrapper_actions}>
          <Button1 text={"افزودن بیمار جدید"} icon={AddIcon} disable={""} />
          <Button2 icon={LocalPrintshopIcon} onClick={""} />
        </div>
      </div>
      <SearchBox />
      <TableUser />
    </div>
  );
}
