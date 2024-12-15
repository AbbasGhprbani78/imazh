"use client"
import { TextField } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { styled } from "@mui/material/styles";
import styles from "./Input.module.css";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    color: "#fff",
    fontFamily: "vazir, sans-serif",
    fontSize: ".9rem",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "vazir, sans-serif",
    fontSize: ".9rem",
    "&.Mui-focused": {
      color: "#fff",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#d9d9d9",
      fontSize: ".9rem",
    },
    "&:hover fieldset": {
      borderColor: "#d9d9d9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d9d9d9",
    },
  },
}));

export default function Input({ label, value, name, onChange }) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <StyledTextField
        id="outlined-basic"
        label={label}
        name={name}
        variant="outlined"
        value={value}
        onChange={onChange}
        className={styles.input}
        autoComplete="off"
      />
    </CacheProvider>
  );
}
