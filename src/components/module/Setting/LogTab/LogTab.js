import React, { useEffect, useState } from "react";
import styles from "./LagTab.module.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { convertToFarsiDigits, convertToPersianDate } from "@/utils/helper";

export default function LogTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/log");
        if (response.status === 200) {
          setLogs(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getLogs();
  }, []);

  return (
    <div className="animationcome">
      <TableContainer className={styles.table_content}>
        {loading ? (
          <div className={`wrap_loading`}>
            <span className={`loading`}></span>
          </div>
        ) : logs.length ? (
          <Table
            stickyHeader
            sx={{
              minWidth: "max-content",
              height: "max-content",
            }}
          >
            <TableHead sx={{ zIndex: "12", position: "relative" }}>
              <TableRow>
                <TableCell align="center" className={styles.table_item}>
                  آیدی
                </TableCell>
                <TableCell align="center" className={styles.table_item}>
                  عملیات
                </TableCell>
                <TableCell align="center" className={styles.table_item}>
                  نقطه دسترسی
                </TableCell>
                <TableCell align="center" className={styles.table_item}>
                  کد وضعیت
                </TableCell>
                <TableCell align="center" className={styles.table_item}>
                  پیغام
                </TableCell>
                <TableCell align="center" className={styles.table_item}>
                  تاریخ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.length > 0 &&
                logs.map((log) => (
                  <TableRow>
                    <TableCell align="center" className={styles.cell_item}>
                      {convertToFarsiDigits(log.id)}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {log.action}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {log.endpoint.substring(log.endpoint.indexOf("/api") + 4)}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {convertToFarsiDigits(log.status)}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {log.description}
                    </TableCell>

                    <TableCell align="center" className={styles.cell_item}>
                      {convertToPersianDate(log.timestamp)}
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
  );
}
