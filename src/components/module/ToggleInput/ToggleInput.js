import React from "react";
import { Stack, styled, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import styles from "./ToggleInput.module.css";

export default function ToggleInput({ select1, select2, title }) {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 32,
    padding: 0,
    display: "flex",
    fontFamily: "vazir",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 26,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(30px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 4,
      transition: theme.transitions.create(["transform"], {
        duration: 500,
      }),
      "&.Mui-checked": {
        transform: "translateX(30px)",
        color: "var(--color-5)",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#53a7f3",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: 24,
      height: 24,
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      transition: theme.transitions.create(["width"], {
        duration: 500,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 32 / 2,
      opacity: 1,
      backgroundColor: "#53a7f3",
      boxSizing: "border-box",
    },
  }));

  return (
    <div className={styles.wrap_row}>
      {title && <span className={styles.title}>{title}</span>}
      <Stack
        direction="row"
        sx={{ alignItems: "center", display: "flex" }}
        spacing={0}
      >
        <Typography
          sx={{ padding: "0 0 0 10px" }}
          className={styles.item_toggle}
        >
          {select1}
        </Typography>
        <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
        <Typography
          className={styles.item_toggle}
          sx={{ padding: "0 10px 0 0" }}
        >
          {select2}
        </Typography>
      </Stack>
    </div>
  );
}
