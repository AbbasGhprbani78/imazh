"use client";
import { TextField } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { styled } from "@mui/material/styles";
import styles from "./Input.module.css";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    color: "var(--color-5)",
    fontFamily: "vazir, sans-serif",
    fontSize: ".9rem",
    borderRadius: "8px",
    "&.Mui-disabled": {
      backgroundColor: "var(--color-17)",
      color: "#ّّfff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-5)",
    fontFamily: "vazir, sans-serif",
    fontSize: ".9rem",
    "&.Mui-focused": {
      color: "var(--color-5)",
    },
    "&.Mui-disabled": {
      color: "var(--color-18)",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--color-5)",
      fontSize: ".9rem",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-5)",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "var(--color-19)",
    },
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

export default function Input({ label, value, name, onChange, type, disable }) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

   const handleInput = (event) => {
     if (type === "number" && event.target.value < 0) {
       event.target.value = "";
     }
   };
  return (
    <CacheProvider value={cacheRtl}>
      <StyledTextField
        id="outlined-basic"
        label={label}
        name={name}
        variant="outlined"
        value={value}
        onChange={onChange}
        onInput={handleInput}
        className={styles.input}
        autoComplete="off"
        type={type}
        disabled={disable}
      />
    </CacheProvider>
  );
}
