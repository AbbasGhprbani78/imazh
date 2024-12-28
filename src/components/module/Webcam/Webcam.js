"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Webcam.module.css";

export default function Webcam({ setting, data, setPhotos }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        const sonyCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("sony")
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
          startRecording(stream);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    const startRecording = (stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const videoURL = URL.createObjectURL(blob);
        setPhotos((prevPhotos) => [...prevPhotos, videoURL]); 
      };

      mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };

    if (setting && data === "AG2" && !isRecording) {
      startCamera();
    } else if (data === "AG9") {
      stopRecording();
      stopCamera();
    }

    return () => {
      if (isRecording) {
        stopRecording();
        stopCamera();
      }
    };
  }, [data, selectedDevice, setting, setPhotos, isRecording]);

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay className={styles.video} />
      {!isRecording && <p>Waiting to start recording...</p>}
    </div>
  );
}
