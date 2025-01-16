import React, { useState, useEffect } from "react";
import styles from "./DataBackup.module.css";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button1 from "../../Buttons/Button1";
import axios from "axios";
import Toast from "../../Toast/Toast";
import { convertToPersianDate } from "@/utils/helper";
import Button2 from "../../Buttons/Button2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DataBackupTab() {
  const [loading, setLoading] = useState(false);
  const [backups, setBackups] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });

  const [loadingForFile, setLoadingForFile] = useState({});

  const getBackups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/backup");
      if (response.status === 200) {
        setBackups(response.data);
      }
    } catch {
      error;
    }
  };

  const backupHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/backup/createbackup"
      );
      if (response.status === 200) {
        getBackups();
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "پشتیبان گیری با موفقیت انجام شد",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در پشتیبان گیری",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    } finally {
      setLoading(false);
    }
  };

  const restoreHandler = async (fileName) => {
    if (!fileName) {
      return;
    }

    try {
      setLoadingForFile((prev) => ({ ...prev, [fileName]: true }));
      const response = await axios.get(
        `http://localhost:3000/api/backup/${fileName}`,
        {
          responseType: "blob",
        }
      );

      const file = new File([response.data], fileName, {
        type: "application/zip",
      });

      const formData = new FormData();
      formData.append("backup", file);

      const restoreResponse = await axios.post(
        "http://localhost:3000/api/backup/restorebackup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (restoreResponse.status === 200) {
        console.log(restoreResponse.data);
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "بازگردانی موفقیت آمیز",
          message: "پشتیبان با موفقیت بازگردانی شد",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در بازگردانی",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    } finally {
      setLoadingForFile((prev) => ({ ...prev, [fileName]: false }));
    }
  };

  const deleteBackup = async (fileName) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/backup/${fileName}`
      );

      if (response.status === 200) {
        getBackups();
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "حذف موفقیت آمیز",
          message: `پشتیبان ${fileName} با موفقیت حذف شد`,
        });
      }
    } catch (error) {
      console.log("Error deleting backup:", error);
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در حذف پشتیبان",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    }
  };

  useEffect(() => {
    getBackups();
  }, []);

  return (
    <>
      <div className="animationcome">
        <div className={styles.wrap_btn}>
          <Button1
            text={"ایجاد پشتیبان"}
            icon={ReplayOutlinedIcon}
            Onclick={backupHandler}
            disable={loading}
          />
        </div>
        <TableContainer className={styles.table_content}>
          {loading ? (
            <div className={`wrap_loading`}>
              <span className={`loading`}></span>
            </div>
          ) : backups.length ? (
            <Table
              stickyHeader
              sx={{ minWidth: "max-content", height: "max-content" }}
            >
              <TableHead sx={{ zIndex: "12", position: "relative" }}>
                <TableRow>
                  <TableCell align="center" className={styles.table_item}>
                    نام فایل
                  </TableCell>
                  <TableCell align="center" className={styles.table_item}>
                    تاریخ ایجاد
                  </TableCell>
                  <TableCell align="center" className={styles.table_item}>
                    عملیات ها
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {backups.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell align="center" className={styles.cell_item}>
                      {item.name}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {convertToPersianDate(item.createdAt)}
                    </TableCell>

                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                      align="center"
                      className={styles.cell_item}
                    >
                      <div className={styles.wrap_btn}>
                        <Button1
                          icon={ReplayOutlinedIcon}
                          text={"باز گردانی"}
                          Onclick={() => restoreHandler(item.name)}
                          disable={loadingForFile[item.name]}
                        />
                      </div>
                      <Button2
                        onClick={() => deleteBackup(item.name)}
                        icon={DeleteOutlineIcon}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.1rem",
              }}
            >
              موردی یافت نشد
            </div>
          )}
        </TableContainer>
      </div>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}
