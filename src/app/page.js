"use client"
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import Input from "@/components/module/Input/Input";
import LeftSection from "@/components/module/LeftSection/LeftSection";
import RightSection from "@/components/module/RightSection/RightSection";
import Header from "@/components/module/Header/Header";
import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
import Modal from "@/components/module/Modal/Modal";
import InputData from "@/components/module/InputData/InputData";
import Button1 from "@/components/module/Buttons/Button1";
import styles from './page.module.css';
export default function Home() {
   const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="container">
        <Header />
        <div className={`wrapper`}>
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
                <RightSection>
                  <div className={styles.wrapdrop}>
                    <DropDownSearch
                      firstoption="افزودن بیمار"
                      onFirstOptionClick={() => setShowModal(true)}
                      title={"انتخاب بیمار"}
                    />
                  </div>
                  <div className={styles.wrapdrop}>
                    <DropDownSearch title={"انتخاب بیمار"} />
                  </div>
                  <div className={styles.wrapdrop}>
                    <DropDownSearch title={"انتخاب بیمار"} />
                  </div>
                </RightSection>
              </Grid>
              <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
                <LeftSection />
              </Grid>
            </Grid>
          </Box>
          <Modal
            title="افزودن"
            onClick={() => setShowModal(false)}
            showModal={showModal}
          >
            <form action="" style={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label="نام و نام خانوادگی"
                      value={""}
                      onChange={""}
                      name={""}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input label="کدملی" value={""} onChange={""} name={""} />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input label="ایمیل" value={""} onChange={""} name={""} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label="شماره تلفن"
                      value={""}
                      onChange={""}
                      name={""}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DropDownSearch title="انتخاب عملیات" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label="شماره پرونده"
                      value={""}
                      onChange={""}
                      name={""}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputData label="تاریخ مراجعه" />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputData label="تاریخ تولد" />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input label="سن" value={""} onChange={""} name={""} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DropDownSearch title="جنسیت" />
                  </Grid>
                </Grid>
              </Box>
              <div className={styles.wrap_btn}>
                <Button1 text={"ذخیره"} icon={DoneIcon} />
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}
