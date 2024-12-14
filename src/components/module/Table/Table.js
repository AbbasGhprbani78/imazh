"use client"
import { useState } from "react";
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
import { convertToFarsiDigits } from "../../../utils/convertNumberToFarsi";

export default function TableUser() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([
    {
      id: 1,
      full_name: "عباس قربانی",
      File_number: "1100158",
      national_code: "1234567890",
      surgery: "بوتاکس",
      recording_mode: "manual",
      phone_number: "09162957253",
      age: 25,
      gender: "مرد",
    },
    {
      id: 2,
      full_name: "زهرا محمدی",
      File_number: "1100159",
      national_code: "9876543210",
      surgery: "لیزر پوست",
      recording_mode: "online",
      phone_number: "09134567890",
      age: 30,
      gender: "زن",
    },
    {
      id: 3,
      full_name: "رضا مرادی",
      File_number: "1100160",
      national_code: "1122334455",
      surgery: "پیوند مو",
      recording_mode: "manual",
      phone_number: "09351234567",
      age: 35,
      gender: "مرد",
    },
    {
      id: 4,
      full_name: "مهسا کریمی",
      File_number: "1100161",
      national_code: "9988776655",
      surgery: "جراحی بینی",
      recording_mode: "online",
      phone_number: "09221234567",
      age: 28,
      gender: "زن",
    },
    {
      id: 5,
      full_name: "سعید حسینی",
      File_number: "1100162",
      national_code: "2233445566",
      surgery: "لیفت صورت",
      recording_mode: "manual",
      phone_number: "09331234567",
      age: 40,
      gender: "مرد",
    },
    {
      id: 6,
      full_name: "فرزانه فراهانی",
      File_number: "1100163",
      national_code: "3344556677",
      surgery: "لیفت پلک",
      recording_mode: "online",
      phone_number: "09141234567",
      age: 32,
      gender: "زن",
    },
    {
      id: 7,
      full_name: "مهدی عباسی",
      File_number: "1100164",
      national_code: "4455667788",
      surgery: "تزریق ژل",
      recording_mode: "manual",
      phone_number: "09151234567",
      age: 29,
      gender: "مرد",
    },
    {
      id: 8,
      full_name: "نرگس رستمی",
      File_number: "1100165",
      national_code: "5566778899",
      surgery: "لیپوساکشن",
      recording_mode: "online",
      phone_number: "09231234567",
      age: 34,
      gender: "زن",
    },
    {
      id: 9,
      full_name: "علی اکبری",
      File_number: "1100166",
      national_code: "6677889900",
      surgery: "جراحی فک",
      recording_mode: "manual",
      phone_number: "09161234567",
      age: 27,
      gender: "مرد",
    },
  ]);

  const [filterRows, setFilterRows] = useState([
    {
      id: 1,
      full_name: "عباس قربانی",
      File_number: "1100158",
      national_code: "1234567890",
      surgery: "بوتاکس",
      recording_mode: "manual",
      phone_number: "09162957253",
      age: 25,
      gender: "مرد",
    },
    {
      id: 2,
      full_name: "زهرا محمدی",
      File_number: "1100159",
      national_code: "9876543210",
      surgery: "لیزر پوست",
      recording_mode: "online",
      phone_number: "09134567890",
      age: 30,
      gender: "زن",
    },
    {
      id: 3,
      full_name: "رضا مرادی",
      File_number: "1100160",
      national_code: "1122334455",
      surgery: "پیوند مو",
      recording_mode: "manual",
      phone_number: "09351234567",
      age: 35,
      gender: "مرد",
    },
    {
      id: 4,
      full_name: "مهسا کریمی",
      File_number: "1100161",
      national_code: "9988776655",
      surgery: "جراحی بینی",
      recording_mode: "online",
      phone_number: "09221234567",
      age: 28,
      gender: "زن",
    },
    {
      id: 5,
      full_name: "سعید حسینی",
      File_number: "1100162",
      national_code: "2233445566",
      surgery: "لیفت صورت",
      recording_mode: "manual",
      phone_number: "09331234567",
      age: 40,
      gender: "مرد",
    },
    {
      id: 6,
      full_name: "فرزانه فراهانی",
      File_number: "1100163",
      national_code: "3344556677",
      surgery: "لیفت پلک",
      recording_mode: "online",
      phone_number: "09141234567",
      age: 32,
      gender: "زن",
    },
    {
      id: 7,
      full_name: "مهدی عباسی",
      File_number: "1100164",
      national_code: "4455667788",
      surgery: "تزریق ژل",
      recording_mode: "manual",
      phone_number: "09151234567",
      age: 29,
      gender: "مرد",
    },
    {
      id: 8,
      full_name: "نرگس رستمی",
      File_number: "1100165",
      national_code: "5566778899",
      surgery: "لیپوساکشن",
      recording_mode: "online",
      phone_number: "09231234567",
      age: 34,
      gender: "زن",
    },
    {
      id: 9,
      full_name: "علی اکبری",
      File_number: "1100166",
      national_code: "6677889900",
      surgery: "جراحی فک",
      recording_mode: "manual",
      phone_number: "09161234567",
      age: 27,
      gender: "مرد",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(9);

  const totalPages = Math.ceil(filterRows.length / rowsPerPage);



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
                    {row.full_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row.File_number)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row.national_code)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row.surgery}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row.recording_mode}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row.phone_number)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row.age)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row.gender}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Button2
                      icon={VisibilityIcon}
                      onClick={""}
                    />
                    <Button2 icon={ModeEditOutlinedIcon} onClick={""}/>
                    <Button2 icon={DeleteOutlineIcon} onClick={""}/>
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
