"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Collapse, List, ListItemButton } from "@mui/material";
import RightSection from "@/components/module/RightSection/RightSection";
import styles from "./Setting.module.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import BasicTab from "@/components/module/Setting/BasicTab/BasicTab";
import ImageTab from "@/components/module/Setting/ImageTab/ImageTab";
import VideoTab from "@/components/module/Setting/VideoTab/VideoTab";
import ManualTab from "@/components/module/Setting/ManualTab/ManualTab";

export default function Settings() {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [tab, setTab] = useState(1);

  const handleSubDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="wrapper">
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "flex",
            alignItems: "start",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ height: "100%" }}>
            <RightSection style={"setting"}>
              <List>
                <ListItemButton
                  onClick={handleSubDropdownToggle}
                  className={`${styles.record_list} ${styles.hover_class}`}
                >
                  حالت ضبط
                  {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <li
                      className={`${styles.record_item} ${styles.hover_class} ${
                        tab === 1 && styles.active_Tab
                      }`}
                      onClick={() => setTab(1)}
                    >
                      پایه
                    </li>
                    <li
                      className={`${styles.record_item} ${styles.hover_class} ${
                        tab === 2 && styles.active_Tab
                      }`}
                      onClick={() => setTab(2)}
                    >
                      ویدئو
                    </li>
                    <li
                      className={`${styles.record_item} ${styles.hover_class} ${
                        tab === 3 && styles.active_Tab
                      }`}
                      onClick={() => setTab(3)}
                    >
                      عکس
                    </li>
                    <li
                      className={`${styles.record_item} ${styles.hover_class} ${
                        tab === 4 && styles.active_Tab
                      }`}
                      onClick={() => setTab(4)}
                    >
                      دستی
                    </li>
                  </List>
                </Collapse>
                <ListItemButton
                  className={`${styles.item_setting} ${styles.hover_class}`}
                >
                  تم
                </ListItemButton>
                <ListItemButton
                  className={`${styles.item_setting} ${styles.hover_class}`}
                >
                  دسترسی کاربر
                </ListItemButton>
              </List>
            </RightSection>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
            <div className={styles.setting_wrapper}>
              <p className={styles.title_Tab}>
                {tab === 1
                  ? "پایه"
                  : tab === 2
                  ? "ویدئو"
                  : tab === 3
                  ? "عکس"
                  : tab === 4
                  ? "دستی"
                  : null}
              </p>
              <div className={styles.setting_content}>
                {tab === 1 ? (
                  <BasicTab />
                ) : tab === 2 ? (
                  <VideoTab />
                ) : tab === 3 ? (
                  <ImageTab />
                ) : tab === 4 ? (
                  <ManualTab />
                ) : null}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
