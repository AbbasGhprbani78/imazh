"use client";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Collapse, List, ListItemButton } from "@mui/material";
import RightSection from "@/components/module/RightSection/RightSection";
import styles from "./Setting.module.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import VideoTab from "@/components/module/Setting/VideoTab/VideoTab";
import ThemeTab from "@/components/module/Setting/ThemeTab/ThemeTab";
import LogTab from "@/components/module/Setting/LogTab/LogTab";
import DataBackupTab from "@/components/module/Setting/DataBackupTab/DataBackupTab";
import { MyContext } from "@/context/context";
import LeftSection from "@/components/module/LeftSection/LeftSection";
import ImageTab from "@/components/module/Setting/ImageTab/ImageTab";

export default function Settings() {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [tab, setTab] = useState(5);
  const { selectTab } = useContext(MyContext);

  const handleSubDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const tabs = [
    { title: "ویدئو", component: <VideoTab /> },
    { title: "عکس", component: <ImageTab /> },
    { title: "تم", component: <ThemeTab /> },
    { title: "لاگ", component: <LogTab /> },
    { title: "پشتیبان‌گیری اطلاعات", component: <DataBackupTab /> },
  ];

  useEffect(() => {
    if (selectTab) {
      setTab(selectTab);
    }
  }, [selectTab]);

  return (
    <div className={"wrapper"}>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "flex",
            alignItems: "stretch",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <Grid
            size={{ xs: 12, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                    {tabs.slice(0, 2).map((tabItem, index) => (
                      <li
                        key={index}
                        className={`${styles.record_item} ${
                          styles.hover_class
                        } ${tab === index + 1 && styles.active_Tab}`}
                        onClick={() => setTab(index + 1)}
                      >
                        {tabItem.title}
                      </li>
                    ))}
                  </List>
                </Collapse>
                {tabs.slice(2).map((tabItem, index) => (
                  <ListItemButton
                    key={index + 3}
                    className={`${styles.item_setting} ${styles.hover_class} ${
                      tab === index + 3 && styles.active_Tab
                    }`}
                    onClick={() => setTab(index + 3)}
                  >
                    {tabItem.title}
                  </ListItemButton>
                ))}
              </List>
            </RightSection>
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
            <LeftSection>
              <div className={styles.setting_wrapper}>
                <p className={styles.title_Tab}>
                  {tabs[tab - 1]?.title || null}
                </p>
                <div className={styles.setting_content}>
                  {tabs[tab - 1]?.component || null}
                </div>
              </div>
            </LeftSection>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
