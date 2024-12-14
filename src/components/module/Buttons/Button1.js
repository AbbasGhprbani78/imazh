import Button from "@mui/material/Button";
import styles from "./Button.module.css";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(() => ({
  color: "#fff",
  fontSize: ".9rem",
  borderRadius: "15px",
  fontFamily: "vazir",
  paddingLeft: "20px",
  paddingRight: "20px",
  position: "relative",
  background: "#53a7f3",
  width: "100%",
}));

export default function Button1({ text, icon: Icon, type }) {
  return (
    <CustomButton
      startIcon={Icon ? <Icon className={styles.icon} /> : null}
      dir="ltr"
      className={styles.button}
      type={type}
    >
      <span className={styles.text_btn}>{text}</span>
    </CustomButton>
  );
}
