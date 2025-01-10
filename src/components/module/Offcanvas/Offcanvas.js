"use client";
import React, { useContext, useState } from "react";
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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MyContext } from "@/context/context";
import { usePathname, useRouter } from "next/navigation";
export default function Offcanvas({
  openProfileModal,
  openPasswordModal,
  openLogoutModal,
  me,
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const { setSelectTab } = useContext(MyContext);
  const router = useRouter();
  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleSubDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleSubDropdownToggle2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };
  const handleSubDropdownToggle3 = () => {
    setDropdownOpen3(!dropdownOpen3);
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleGoToSetting = (tabNumber) => {
    setSelectTab(tabNumber);
    handleDrawerToggle()
    router.push("/setting");
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
          <MenuIcon className={styles.menu_icon} />
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
                <ListItemButton
                  sx={{ marginBottom: "1.5rem", padding: "0" }}
                  className={`${isActive("/") && styles.active_route}`}
                >
                  <Link
                    className={`${styles.link_offcanvas} ${styles.item_distance}`}
                    href={"/"}
                  >
                    <div className={styles.wrap_text_icon}>
                      <HomeOutlinedIcon
                        sx={{ width: "1.7rem", height: "1.7rem" }}
                      />
                      <span className={styles.link_text}>صفحه اصلی</span>
                    </div>
                  </Link>
                </ListItemButton>
                <ListItemButton
                  sx={{ marginBottom: "1.5rem", padding: "0" }}
                  className={`${isActive("/archive") && styles.active_route}`}
                >
                  <Link
                    className={`${styles.link_offcanvas} ${styles.item_distance} `}
                    href={"/archive"}
                  >
                    <div className={styles.wrap_text_icon}>
                      <Inventory2OutlinedIcon
                        sx={{ width: "1.7rem", height: "1.7rem" }}
                      />
                      <span className={styles.link_text}>آرشیو</span>
                    </div>
                  </Link>
                </ListItemButton>
                <ListItemButton
                  sx={{ marginBottom: "1.5rem", padding: "0" }}
                  onClick={handleSubDropdownToggle2}
                  className={`${isActive("/setting") && styles.active_route}`}
                >
                  <li
                    className={`${styles.link_offcanvas} ${styles.item_distance}`}
                  >
                    <div className={styles.wrap_text_icon}>
                      <SettingsOutlinedIcon
                        sx={{ width: "1.7rem", height: "1.7rem" }}
                      />
                      <span className={styles.link_text}>تنظیمات</span>
                    </div>
                    {dropdownOpen2 ? <ExpandLess /> : <ExpandMore />}
                  </li>
                </ListItemButton>
                <Collapse in={dropdownOpen2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ marginBottom: "1rem", padding: "0 2rem 0 0" }}
                      onClick={handleSubDropdownToggle3}
                    >
                      <li
                        className={`${styles.link_offcanvas} ${styles.item_distance}`}
                      >
                        <div className={styles.wrap_text_icon}>
                          <span className={styles.link_text}>حالت ضبط</span>
                        </div>
                        {dropdownOpen3 ? <ExpandLess /> : <ExpandMore />}
                      </li>
                    </ListItemButton>
                    <Collapse in={dropdownOpen3} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{ marginBottom: "1rem", padding: "0 4rem 0 0" }}
                          onClick={() => handleGoToSetting(1)}
                        >
                          <li className={styles.link_offcanvas}>
                            <span className={styles.link_text}>پایه</span>
                          </li>
                        </ListItemButton>
                        <ListItemButton
                          sx={{ marginBottom: "1rem", padding: "0 4rem 0 0" }}
                          onClick={() => handleGoToSetting(2)}
                        >
                          <li className={styles.link_offcanvas}>
                            <span className={styles.link_text}>ویدئو</span>
                          </li>
                        </ListItemButton>
                        <ListItemButton
                          sx={{ marginBottom: "1rem", padding: "0 4rem 0 0" }}
                          onClick={() => handleGoToSetting(3)}
                        >
                          <li className={styles.link_offcanvas}>
                            <span className={styles.link_text}>عکس</span>
                          </li>
                        </ListItemButton>
                        <ListItemButton
                          sx={{ marginBottom: "1rem", padding: "0 4rem 0 0" }}
                          onClick={() => handleGoToSetting(4)}
                        >
                          <li className={styles.link_offcanvas}>
                            <span className={styles.link_text}>دستی</span>
                          </li>
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton
                      sx={{ marginBottom: "1rem", padding: "0 2rem 0 0" }}
                      onClick={() => handleGoToSetting(5)}
                    >
                      <li className={styles.link_offcanvas}>
                        <span className={styles.link_text}>تم</span>
                      </li>
                    </ListItemButton>
                    <ListItemButton
                      sx={{ marginBottom: "1rem", padding: "0 2rem 0 0" }}
                      onClick={() => handleGoToSetting(6)}
                    >
                      <li className={styles.link_offcanvas}>
                        <span className={styles.link_text}>لاگ</span>
                      </li>
                    </ListItemButton>
                    <ListItemButton
                      sx={{ marginBottom: "1rem", padding: "0 2rem 0 0" }}
                      onClick={() => handleGoToSetting(7)}
                    >
                      <li className={styles.link_offcanvas}>
                        <span className={styles.link_text}>
                          پشتیبان‌گیری اطلاعات
                        </span>
                      </li>
                    </ListItemButton>
                  </List>
                </Collapse>
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
                <div className={styles.wrap_text_icon}>
                  <LogoutOutlinedIcon
                    sx={{ width: "1.7rem", height: "1.7rem" }}
                  />
                  <span className={styles.link_text}>خروج</span>
                </div>
              </li>
            </ListItemButton>
          </List>
        </Drawer>
      </div>
    </>
  );
}
