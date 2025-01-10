import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import styles from "./Button.module.css";

const CustomButton = styled(Button)(() => ({
  color: "var(--color-5)", 
  fontSize: "1rem",
  borderRadius: "15px", 
  fontFamily: "vazir",
  padding: "8px 0",
  minWidth: "42px",
  minHeight: "40px",
  background: "var(--color-4)", 
  "&:hover": {
    background: "var(--color-6)", 
  },
  "&:disabled": {
    background: "var(--color-8)", 
    color: "var(--color-7)",
    cursor: "not-allowed",
  },
}));

export default function Button2({ icon: Icon, onClick }) {
  return (
    <CustomButton className={styles.button2} onClick={onClick}>
      {Icon && <Icon className={styles.icon2} />}
    </CustomButton>
  );
}
