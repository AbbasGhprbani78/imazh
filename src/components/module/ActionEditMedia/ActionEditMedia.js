"use client";
import React, { useContext, useRef, useState } from "react";
import styles from "./ActionEditMedai.module.css";
import Image from "next/image";
import Button1 from "../Buttons/Button1";
import { FaDownload } from "react-icons/fa6";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TiDeleteOutline } from "react-icons/ti";
import { MyContext } from "@/context/context";
import axios from "axios";

export default function ActionEditMedia() {
  const [imageWatermark, setImageWaterMark] = useState("");
  const [audio, setAudio] = useState("");
  const waterMarkRef = useRef(null);
  const audioFileRef = useRef(null);
  const { selectedGroup1, selectedGroup2 } = useContext(MyContext);

  const uploadWaterMark = () => {
    waterMarkRef.current.click();
  };

  const uploadAudio = () => {
    audioFileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageWaterMark(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
    }
  };


const createHandler = async () => {
  const group1Images = selectedGroup1.map((image) => image.url); 
  const group2Images = selectedGroup2.map((image) => image.url);
  const formData = new FormData();

  formData.append("audioFile", audio); 
  formData.append("watermark", imageWatermark);

  group1Images.forEach((url, index) => {
    formData.append(`group1Images[${index}]`, url);
  });

  group2Images.forEach((url, index) => {
    formData.append(`group2Images[${index}]`, url);
  });

  try {
    const response = await axios.post(
      "http://localhost:3000/api/createvideo",
      formData
    );
    console.log("Video created successfully:", response);
  } catch (error) {
    console.error("Error creating video:", error);
  }
};


  return (
    <div className={styles.actions_container}>
      <p className={styles.title_action}>واترمارک</p>
      <div className={styles.wrapper_watermark_item}>
        <div className={styles.wrap_action_top}>
          <button
            className={`${styles.delete_icon} ${styles.btn}`}
            onClick={() => setImageWaterMark("")}
          >
            <TiDeleteOutline className={styles.icon_close} />
          </button>
          <Image
            src={
              imageWatermark
                ? URL.createObjectURL(imageWatermark)
                : "/images/8.svg"
            }
            width={160}
            height={140}
            style={{
              objectFit: "cover",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          />
        </div>
        <Button1
          text={"آپلود واتر مارک"}
          icon={FaDownload}
          Onclick={uploadWaterMark}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={waterMarkRef}
          accept="images/*"
          onChange={handleImageChange}
        />
      </div>
      <p className={styles.title_action}>موسیقی پس زمینه</p>
      <div className={styles.wrapper_watermark_item}>
        <div className={styles.wrap_action_top}>
          <button
            className={`${styles.delete_icon} ${styles.btn}`}
            onClick={() => setAudio("")}
          >
            <TiDeleteOutline className={styles.icon_close} />
          </button>
          {audio && (
            <audio src={URL.createObjectURL(audio)} controls={true}></audio>
          )}
        </div>
        <Button1
          text={"آپلود موسیقی"}
          icon={FaDownload}
          Onclick={uploadAudio}
        />
        <input
          type="file"
          ref={audioFileRef}
          style={{ display: "none" }}
          onChange={handleAudioChange}
          accept="audio/*"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <button className={`${styles.btn}`} onClick={createHandler}>
          <span className={styles.preview_text}>نمایش</span>
          <PlayArrowIcon />
        </button>
      </div>
    </div>
  );
}
