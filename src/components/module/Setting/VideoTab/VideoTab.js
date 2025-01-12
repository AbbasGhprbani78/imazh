import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import Input from "../../Input/Input";
import ToggleInput from "../../ToggleInput/ToggleInput";
import Button1 from "../../Buttons/Button1";
import NormalDropDown from "../../DropDown/NormalDropDown";
import axios from "axios";
import Toast from "../../Toast/Toast";
export default function VideoTab() {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingVideo, setSettingVideo] = useState({
    resolution: "",
    videoDelay: "",
    format: "",
  });
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });

  const settingChange = (e) => {
    const { name, value } = e.target;
    setSettingVideo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveSettingVideo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:3000/api/videosetting",
        settingVideo
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
    const getSetting = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/videosetting"
        );
        if (response.status === 200) {
          console.log(response.data);
          setSettingVideo({
            resolution: response?.data.resolution,
            videoDelay: response?.data.videoDelay,
            format: response?.data.format,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSetting();
  }, []);

  return (
    <>
      <form onSubmit={saveSettingVideo} className="form-tab">
        <div className={`item-container-setting animationcome`}>
          <div className={"wrap_row"}>
            <NormalDropDown
              items={[
                { id: "4k", name: "4k" },
                { id: "1080p", name: "1080p" },
                { id: "720P", name: "720P" },
              ]}
              title={"رزولیشن ضبط ویدیو"}
              name={"resolution"}
              onChange={settingChange}
              value={settingVideo.resolution}
              style2={"background"}
            />
          </div>
          <div className={"wrap_row"}>
            <Input
              label={"وقفه در شروع ضبط ویدیو"}
              value={settingVideo.videoDelay}
              name={"videoDelay"}
              onChange={settingChange}
              type={"number"}
            />
          </div>
          <div className={"wrap_row"}>
            <NormalDropDown
              items={[
                { id: "mp4", name: "mp4" },
                { id: "webm", name: "webm" },
                { id: "avi", name: "avi" },
              ]}
              title={"پسوند"}
              value={settingVideo.format}
              name={"format"}
              onChange={settingChange}
              style2={"background"}
            />
          </div>
        </div>
        <div className="wrap-buttom">
          <Button1
            text={"ذخیره"}
            type={"submit"}
            icon={DoneIcon}
            disable={loading}
          />
        </div>
      </form>
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


