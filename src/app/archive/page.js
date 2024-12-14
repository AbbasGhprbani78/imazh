"use client";
import styles from "./Archive.module.css";
import AddIcon from "@mui/icons-material/Add";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Button1 from "@/components/module/Buttons/Button1";
import Button2 from "@/components/module/Buttons/Button2";
import SearchBox from "@/components/module/SearchBox/SearchBox";
import TableUser from "@/components/module/Table/Table";
import Header from "@/components/module/Header/Header";

export default function Archive() {
  return (
    <>
      <Header />
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.top}>
          <span className={`title`}>آرشیو</span>
          <div className={styles.wrapper_actions}>
            <Button1 text={"افزودن بیمار جدید"} icon={AddIcon} />
            <Button2 icon={LocalPrintshopIcon} onClick={""} />
          </div>
        </div>
        <SearchBox />
        <TableUser />
      </div>
    </>
  );
}
