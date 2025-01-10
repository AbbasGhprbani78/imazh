import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import styles from "./ImageTab.module.css";
import Button1 from "../../Buttons/Button1";
import DoneIcon from "@mui/icons-material/Done";
import NormalDropDown from "../../DropDown/NormalDropDown";
import Toast from "../../Toast/Toast";
import axios from "axios";

export default function ImageTab() {
  const [format, setFormat] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });

  const saveSettingPhoto = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:3000/api/photosetting",
        { format }
      );
      if (response.status === 200) {
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "تنظیمات با موفقیت تغییر کرد",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در تغییر تنظیمات",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSettingPhoto = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/photosetting"
        );
        if (response.status === 200) {
          setFormat(response.data.format);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSettingPhoto();
  }, []);

  return (
    <>
      <div className="animationcome">
        <form className="form-tab" onSubmit={saveSettingPhoto}>
          <Box sx={{ flexGrow: 1, height: "100%" }}>
            <Grid
              container
              spacing={2.5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <div className={styles.container_drop}>
                  <NormalDropDown
                    items={[
                      { id: "webp", name: "webp" },
                      { id: "jpeg", name: "jpeg" },
                      { id: "jpg", name: "jpg" },
                      { id: "png", name: "png" },
                    ]}
                    title={"پسوند"}
                    value={format}
                    name={"format"}
                    onChange={(e) => setFormat(e.target.value)}
                    style2={"background"}
                  />
                </div>
              </Grid>
              {/* <Grid size={{ xs: 12, md: 6 }} className={styles.container_toggle}>
              <ToggleInput select1={"خودکار"} select2={"دستی"} />
            </Grid> */}
            </Grid>
            {/* <div className={styles.images_wrapper}>
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
          </div> */}
          </Box>
          <div className="wrap-buttom">
            <Button1
              text={"ذخیره"}
              type={"submit"}
              icon={DoneIcon}
              disable={loading}
            />
          </div>
        </form>
      </div>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}
