"use client";
import styles from "./Table.module.css";
import Button2 from "../Buttons/Button2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { calculateAge, convertToFarsiDigits } from "../../../utils/helper";

export default function TableUser({
  archives,
  totalPage,
  handlePageChange,
  page,
  setShowModal,
  setArchiveId,
}) {
  const router = useRouter();
  const goToArchiveCustomer = (name, id) => {
    const formattedName = name.replace(/ /g, "-");
    router.push(`/archive/${formattedName}?id=${id}`);
  };

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
            {archives?.length > 0 &&
              archives.map((row, index) => (
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
                    {convertToFarsiDigits(row?.customer?.filenumber)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row?.customer?.nationalcode)}
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
                    {row?.setting?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(row?.customer?.phonenumber)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {convertToFarsiDigits(
                      calculateAge(row?.customer?.birthday)
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontFamily: "vazir" }}
                  >
                    {row?.customer?.gender === "men" ? "مرد" : "زن"}
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
                      onClick={() =>
                        goToArchiveCustomer(
                          row?.customer?.fullname,
                          row?.id
                        )
                      }
                    />
                    <Button2
                      icon={DeleteOutlineIcon}
                      onClick={() => {
                        setShowModal(true);
                        setArchiveId(row?.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPage}
        page={page}
        onChange={handlePageChange}
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
