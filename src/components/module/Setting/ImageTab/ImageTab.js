import React from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import DropDownSearch from "../../DropDown/DropDownSearch";
import ToggleInput from "../../ToggleInput/ToggleInput";
import Input from "../../Input/Input";
import styles from "./ImageTab.module.css";
import Button1 from "../../Buttons/Button1";
import DoneIcon from "@mui/icons-material/Done";

export default function ImageTab() {
  return (
    <div className="animationcome">
      <form className="form-tab">
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Grid
            container
            spacing={2.5}
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <div className={styles.container_drop}>
                <DropDownSearch
                  items={[]}
                  title={"پسوند"}
                  name={"extension"}
                  onChange={""}
                  getOptionLabelProp={""}
                  value={""}
                  style1={"dropimage"}
                  style2={"background"}
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} className={styles.container_toggle}>
              <ToggleInput select1={"خودکار"} select2={"دستی"} />
            </Grid>
          </Grid>
          <div className={styles.images_wrapper}>
            <span className={styles.textimages}>۷ تصویر</span>
            <Grid
              container
              spacing={2.5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img1"}
                  label={"تصویر اول"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img2"}
                  label={"تصویر دوم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img3"}
                  label={"تصویر سوم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img4"}
                  label={"تصویر چهارم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img5"}
                  label={"تصویر پنجم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img6"}
                  label={"تصویر ششم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img6"}
                  label={"تصویر هفتم"}
                />
              </Grid>
            </Grid>
          </div>
          <div className={styles.fiveimage}>
            <span className={styles.textimages}>۵ تصویر</span>
            <Grid
              container
              spacing={2.5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img1"}
                  label={"تصویر اول"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img2"}
                  label={"تصویر دوم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img3"}
                  label={"تصویر سوم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img4"}
                  label={"تصویر چهارم"}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Input
                  value={""}
                  onChange={""}
                  name={"img5"}
                  label={"تصویر پنجم"}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
        <div className="wrap-buttom">
          <Button1 text={"ذخیره"} Onclick={""} icon={DoneIcon} />
        </div>
      </form>
    </div>
  );
}
