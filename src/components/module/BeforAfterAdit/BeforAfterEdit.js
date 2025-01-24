import React, { useContext } from "react";
import styles from "./BeforAfterEdit.module.css";
import Grid from "@mui/material/Grid2";
import { MyContext } from "@/context/context";
export default function BeforAfterEdit({ group1Images, group2Images }) {
  const {
    setSelectedGroup1,
    setSelectedGroup2,
    selectedGroup1,
    selectedGroup2,
  } = useContext(MyContext);


  const toggleSelectImage = (group, item) => {
    if (group === "group1") {
      setSelectedGroup1((prev) =>
        prev.some((img) => img.url === item.url)
          ? prev.filter((img) => img.url !== item.url)
          : [...prev, item]
      );
    } else if (group === "group2") {
      setSelectedGroup2((prev) =>
        prev.some((img) => img.url === item.url)
          ? prev.filter((img) => img.url !== item.url)
          : [...prev, item]
      );
    }
  };

  const isSelected = (group, item) => {
    return group === "group1"
      ? selectedGroup1.some((img) => img.url === item.url)
      : selectedGroup2.some((img) => img.url === item.url);
  };

  return (
    <Grid
      container
      className={`${styles.beforafteredit_container} ${styles.content_images}`}
    >
      <Grid size={{ xs: 12, md: 6 }} className={styles.beforimage_container}>
        <span className={styles.text_section}>قبل</span>
        <Grid
          container
          className={styles.wrap_media}
          sx={{ display: "flex" }}
          spacing={2}
        >
          {group1Images.map((item, i) => (
            <Grid
              key={i}
              className={`${styles.box} ${
                isSelected("group1", item) ? styles.selected : ""
              }`}
              size={{ xs: 12, md: 3 }}
              onClick={() => toggleSelectImage("group1", item)}
            >
              <img src={item.url} alt={`group1-${i}`} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        className={`${styles.afterimage_container}`}
      >
        <span className={styles.text_section}>بعد</span>
        <Grid
          container
          className={styles.wrap_media}
          sx={{ display: "flex" }}
          spacing={2}
        >
          {group2Images.map((item, i) => (
            <Grid
              key={i}
              className={`${styles.box} ${
                isSelected("group2", item) ? styles.selected : ""
              }`}
              size={{ xs: 12, md: 3 }}
              onClick={() => toggleSelectImage("group2", item)}
            >
              <img src={item.url} alt={`group2-${i}`} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
