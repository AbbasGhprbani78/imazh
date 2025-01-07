import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import styles from "./Button.module.css";

const CustomButton = styled(Button)(() => ({
  color: "#000",
  fontSize: "1rem",
  borderRadius: "15px",
  fontFamily: "vazir",
  padding: "8px 0",
  minWidth: "42px",
  minHeight: "40px",
  background: "#53a7f3",
}));

export default function Button2({ icon: Icon, onClick }) {
  return (
    <CustomButton className={styles.button2} onClick={onClick}>
      {Icon && <Icon className={styles.icon2} />}
    </CustomButton>
  );
}
