"use client";
import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
import LeftSection from "@/components/module/LeftSection/LeftSection";
import RightSection from "@/components/module/RightSection/RightSection";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import styles from "./CustomerArchive.module.css";
import { Box } from "@mui/material";
import Modal from "@/components/module/Modal/Modal";
import DisplayPhoto from "@/components/module/DisplayPhoto/DisplayPhoto";
import Button2 from "@/components/module/Buttons/Button2";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import axios from "axios";

import Preview from "@/components/module/Preview/Preview";
import ModalBottom from "@/components/module/ModalBottom/ModalBottom";
export default function CustomerArchive({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const getArchiveDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/archive/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModalBottom = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getArchiveDetails();
  }, []);

  return (
    <div className="wrapper">
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "flex",
            alignItems: "stretch",
            flexWrap: "wrap",
            height: "100%",
            rowGap: "0",
          }}
        >
          <Grid
            size={{ xs: 12, md: 4, lg: 3 }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <RightSection style={"archive"}>
              <div className={styles.content_right}>
                <DropDownSearch
                  title={"حالت ضبط"}
                  firstoptiontext="حالت ضبط جدید"
                  firstoptionclick={() => setShowModal(true)}
                  items={[]}
                  name={"recordId"}
                  getOptionLabelProp=""
                  onChange={""}
                  value={""}
                  setIsNewOperation={""}
                />
                <div className={styles.wrap_display}>
                  <DisplayPhoto title={"نحوه نمایش عکس‌ها"} item={"1"} />
                  <DisplayPhoto title={"گرید"} item={"2"} />
                </div>
                <div className={styles.wrap_actions}>
                  <Button2 icon={AutoFixHighOutlinedIcon} onClick={""} />
                  <Button2 icon={WorkspacesOutlinedIcon} onClick={""} />
                  <Button2 icon={TollOutlinedIcon} onClick={""} />
                  <Button2 icon={BrushOutlinedIcon} onClick={""} />
                </div>
              </div>
            </RightSection>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
            <Grid className={styles.wrap_images} container spacing={2.5}>
              <Grid size={{ xs: 12, lg: 6 }} className={styles.Preview_item}>
                <Preview toggleModalBottom={toggleModalBottom}></Preview>
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }} className={styles.Preview_item}>
                <Preview toggleModalBottom={toggleModalBottom}></Preview>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Modal
        title={"افزودن حالت ضبط"}
        onClick={() => setShowModal(false)}
        showModal={showModal}
      ></Modal>
      <ModalBottom isVisible={isVisible} setIsVisible={setIsVisible}>
        <DropDownSearch
          title={"حالت ضبط"}
          firstoptiontext="حالت ضبط جدید"
          firstoptionclick={() => setShowModal(true)}
          items={[]}
          name={"recordId"}
          getOptionLabelProp=""
          onChange={""}
          value={""}
          setIsNewOperation={""}
        />
        <div className={styles.wrap_display}>
          <DisplayPhoto title={"نحوه نمایش عکس‌ها"} item={"1"} />
          <DisplayPhoto title={"گرید"} item={"2"} />
        </div>
        <div className={styles.wrap_actions}>
          <Button2 icon={AutoFixHighOutlinedIcon} onClick={""} />
          <Button2 icon={WorkspacesOutlinedIcon} onClick={""} />
          <Button2 icon={TollOutlinedIcon} onClick={""} />
          <Button2 icon={BrushOutlinedIcon} onClick={""} />
        </div>
      </ModalBottom>
    </div>
  );
}
