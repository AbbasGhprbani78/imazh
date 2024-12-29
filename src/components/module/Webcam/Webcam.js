"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Webcam.module.css";

export default function Webcam({
  setting,
  data,
  setPhotos,
  socket,
  setSocket,
}) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const canvasRef = useRef(null);
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
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();

    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        context.drawImage(videoRef.current, 0, 0, width, height);
        const imageUrl = canvasRef.current.toDataURL("image/png");
        setPhotos((prevPhotos) => [...prevPhotos, imageUrl]);
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

    if (setting === "#MKE02$A22*") {
      if (data === "AD7" && !isRecording) {
        const stream = videoRef.current?.srcObject;
        if (stream) startRecording(stream);
      } else if (data === "AE1") {
        stopRecording();
        socket.disconnect();
        setSocket(null);
      }
    }

    if (setting === "#MKE01$A11*") {
      if (data === "AG5" && !isRecording) {
        const stream = videoRef.current?.srcObject;
        if (stream) startRecording(stream);
      } else if (data === "AG6") {
        stopRecording();
        socket.disconnect();
        setSocket(null);
      }
    }

    if (setting === "#MKE03$A33*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AJ5") {
        socket.disconnect();
        setSocket(null);
      }
    }

    if (setting === "#MKE04$A44*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AF9") {
        socket.disconnect();
        setSocket(null);
      }
    }

    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [data, selectedDevice, setting, setPhotos, isRecording]);

  return (
    <div className={styles.container}>
      <video ref={videoRef} autoPlay className={styles.video} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {!isRecording && <p>Waiting to start recording...</p>}
    </div>
  );
}
