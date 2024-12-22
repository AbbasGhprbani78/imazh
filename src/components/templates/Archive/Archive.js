"use client";
import Button2 from "@/components/module/Buttons/Button2";
import SearchBox from "@/components/module/SearchBox/SearchBox";
import TableUser from "@/components/module/Table/Table";
import React, { useEffect, useState } from "react";
import styles from "./Archive.module.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import axios from "axios";
export default function Archive() {
  const [allArchives, setAllArchive] = useState([]);

  const getAllArchive = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/archive");
      if (response.status === 200) {
        setAllArchive(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllArchive();
  }, []);

  console.log(allArchives);

  return (
    <div className={`wrapper ${styles.container}`}>
      <div className={styles.top}>
        <span className={`title`}>آرشیو</span>
        <div className={styles.wrapper_actions}>
          <Button2 icon={LocalPrintshopIcon} onClick={""} />
        </div>
      </div>
      <SearchBox />
      <TableUser archives={allArchives} />
    </div>
  );
}
