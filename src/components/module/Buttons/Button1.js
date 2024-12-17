"use client";
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
  "&:disabled": {
    cursor: "not-allowed",
    background: "#264e73",
  },
}));

export default function Button1({
  text,
  icon: Icon,
  type,
  disable,
  Onclick,
  style,
  backstyle
}) {
  return (
    <CustomButton
      startIcon={Icon ? <Icon className={styles.icon} /> : null}
      dir="ltr"
      className={`${styles.button} ${styles[backstyle]}`}
      type={type}
      disabled={disable}
      onClick={Onclick}
      style={style}
    >
      {disable ? (
        <span className={styles.loader}></span>
      ) : (
        <span className={styles.text_btn}>{text}</span>
      )}
    </CustomButton>
  );
}
