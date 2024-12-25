"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Webcam.module.css";

export default function Webcam() {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        const sonyCamera = videoDevices.find(
          (device) => device.label.toLowerCase().includes("sony") 
        );

        if (sonyCamera) {
          setSelectedDevice(sonyCamera.deviceId); 
        } else if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }

        if (selectedDevice) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDevice } },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setIsCameraActive(true);
        } else if (videoDevices.length > 0) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: videoDevices[0].deviceId } },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setIsCameraActive(true);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [selectedDevice]);


  return (
    <div className={styles.container}>
      {isCameraActive ? (
        <video ref={videoRef} autoPlay className={styles.video} />
      ) : (
        <p>Loading webcam...</p>
      )}
    </div>
  );
}
