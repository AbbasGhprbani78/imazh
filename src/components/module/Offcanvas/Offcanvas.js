"use client";
import React, { useState } from "react";
import styles from "./Offcanvas.module.css";
import {
  Drawer,
  List,
  ListItemButton,
  IconButton,
  Collapse,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
export default function Offcanvas({
  openProfileModal,
  openPasswordModal,
  openLogoutModal,
  me,
}) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
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
          disableEnforceFocus
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
            <ListItemButton
              sx={{ marginBottom: "1.5rem", padding: "0" }}
              onClick={handleSubDropdownToggle}
            >
              <li className={styles.link_offcanvas}>
                <Image
                  src={me.img ? me.img : "/images/5.svg"}
                  alt="profile"
                  width={50}
                  height={50}
                  className={styles.image_profile}
                />
              </li>
            </ListItemButton>
            <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={openProfileModal}
                  sx={{ marginBottom: "1.5rem", padding: "0 2rem 0 0" }}
                >
                  <li className={styles.link_offcanvas}>
                    <PersonIcon sx={{ width: "1.7rem", height: "1.7rem" }} />
                    <span className={styles.link_text}>حساب کاربری</span>
                  </li>
                </ListItemButton>
                <ListItemButton
                  sx={{ marginBottom: "1.5rem", padding: "0 2rem 0 0" }}
                  onClick={openPasswordModal}
                >
                  <li className={styles.link_offcanvas}>
                    <KeyIcon className={styles.icon_action} />
                    <span className={styles.link_text}>تغییر رمز</span>
                  </li>
                </ListItemButton>
              </List>
            </Collapse>
            {me?.role === "a" ? (
              <>
                <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
                  <Link className={styles.link_offcanvas} href={"/"}>
                    <HomeOutlinedIcon
                      sx={{ width: "1.7rem", height: "1.7rem" }}
                    />
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
              </>
            ) : me?.role === "d" ? (
              <>
                <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
                  <Link className={styles.link_offcanvas} href={"/"}>
                    <HomeOutlinedIcon
                      sx={{ width: "1.7rem", height: "1.7rem" }}
                    />
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
              </>
            ) : me?.role === "s" ? (
              <>
                <ListItemButton sx={{ marginBottom: "1.5rem", padding: "0" }}>
                  <Link className={styles.link_offcanvas} href={"/archive"}>
                    <Inventory2OutlinedIcon
                      sx={{ width: "1.7rem", height: "1.7rem" }}
                    />
                    <span className={styles.link_text}>آرشیو</span>
                  </Link>
                </ListItemButton>
              </>
            ) : null}
            <ListItemButton
              sx={{ marginTop: "4rem", padding: "0" }}
              onClick={openLogoutModal}
            >
              <li className={styles.link_offcanvas}>
                <LogoutOutlinedIcon
                  sx={{ width: "1.7rem", height: "1.7rem" }}
                />
                <span className={styles.link_text}>خروج</span>
              </li>
            </ListItemButton>
          </List>
        </Drawer>
      </div>
    </>
  );
}
