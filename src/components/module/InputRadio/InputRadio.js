import React from "react";
import styles from "./InputRadio.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import styled from "@mui/material";

export default function InputRadio({ label }) {
  return (
    <FormControlLabel
      control={<Checkbox size="small" sx={{ padding: " 0 0 0 9px" }} />}
      label={label}
      sx={{ marginRight: "0" }}
    />
  );
}
