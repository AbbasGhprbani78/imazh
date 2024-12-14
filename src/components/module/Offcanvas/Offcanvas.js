import React, { useState } from "react";
import styles from "./Offcanvas.module.css";
import { Drawer, List, ListItemButton, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
export default function Offcanvas() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.offcanvas_container}>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          padding: "0",
        }}
      >
        <MenuIcon sx={{ color: "#fff" }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: 250,
          "& .MuiDrawer-paper": {
            width: 250,
            background: "#2a2a2a",
          },
        }}
      >
        <List sx={{ marginTop: "3rem" }} className="list-offcanvas">
          <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
            <Link className={styles.link_offcanvas} href={"/"}>
              <HomeOutlinedIcon sx={{ width: "1.7rem", height: "1.7rem" }} />
              <span className={styles.link_text}>صفحه اصلی</span>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
            <Link className={styles.link_offcanvas} href={"/archive"}>
              <Inventory2OutlinedIcon
                sx={{ width: "1.7rem", height: "1.7rem" }}
              />
              <span className={styles.link_text}>آرشیو</span>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
            <Link className={styles.link_offcanvas} href={"/setting"}>
              <SettingsOutlinedIcon
                sx={{ width: "1.7rem", height: "1.7rem" }}
              />
              <span className={styles.link_text}>تنظیمات</span>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ marginTop: "4rem", padding: "0" }}>
            <li className={styles.link_offcanvas}>
              <LogoutOutlinedIcon sx={{ width: "1.7rem", height: "1.7rem" }} />
              <span className={styles.link_text}>خروج</span>
            </li>
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}
