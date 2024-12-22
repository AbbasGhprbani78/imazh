"use client";
import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Button2 from "../Buttons/Button2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { convertToFarsiDigits } from "../../../utils/helper";

export default function TableUser({ archives }) {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState();
  const [filterRows, setFilterRows] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(filterRows.length / rowsPerPage);

  useEffect(() => {
    if (archives) {
      setFilterRows(setFilterRows);
      setRows(archives);
    }
  }, [archives]);

  return (
    <div className={styles.table_container}>
      <TableContainer
        className={styles.table_content}
        style={{ maxHeight: 420 }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 750,
          }}
        >
          <TableHead sx={{ zIndex: "12", position: "relative" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                نام بیمار
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                شماره پرونده
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                کد ملی
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                جراحی
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                حالت ضبط
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                شماره تماس
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                سن
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                جنسیت
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  background: "#2a2a2a",
                  color: "#fff",
                  fontFamily: "vazir",
                }}
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.customer?.fullname}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.customer?.filenumber}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.customer?.nationalcode}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.operation?.operation}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.setting?.setting}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Button2 icon={VisibilityIcon} onClick={""} />
                    <Button2 icon={DeleteOutlineIcon} onClick={""} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
        className={styles.pagination}
        sx={{
          display: "flex",
          direction: "ltr",
          justifyContent: "center",
          padding: "10px 0",
          "& .MuiPaginationItem-root": {
            color: "#fff",
            "&.Mui-selected": {
              backgroundColor: "#2a2a2a",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
