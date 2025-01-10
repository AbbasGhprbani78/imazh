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
      <TableContainer className={styles.table_content}>
        <Table
          stickyHeader
          sx={{
            minWidth: "max-content",
          }}
        >
          <TableHead sx={{ zIndex: "12", position: "relative" }}>
            <TableRow>
              <TableCell align="center" className={styles.table_item}>
                نام بیمار
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                شماره پرونده
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                کد ملی
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                جراحی
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                حالت ضبط
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                شماره تماس
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                سن
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                جنسیت
              </TableCell>
              <TableCell align="center" className={styles.table_item}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archives?.length > 0 &&
              archives.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center" className={styles.cell_item}>
                    {row?.customer?.fullname}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {convertToFarsiDigits(row?.customer?.filenumber)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {convertToFarsiDigits(row?.customer?.nationalcode)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {row?.operation?.operation}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {row?.setting?.name}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {convertToFarsiDigits(row?.customer?.phonenumber)}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
                    {convertToFarsiDigits(
                      calculateAge(row?.customer?.birthday)
                    )}
                  </TableCell>
                  <TableCell align="center" className={styles.cell_item}>
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
                        goToArchiveCustomer(row?.customer?.fullname, row?.id)
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
            color: "var(--color-5)",
            "&.Mui-selected": {
              backgroundColor: "#2a2a2a",
              color: "var(--color-5)",
            },
          },
        }}
      />
    </div>
  );
}
