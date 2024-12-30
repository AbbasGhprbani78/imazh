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
  const streamRef = useRef(null);
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
          streamRef.current = stream;
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
        console.log("hello");
        setPhotos((prevPhotos) => [...prevPhotos, imageUrl]);
      }
    };

    const startRecording = () => {
      const stream = streamRef.current;
      if (!stream) {
        console.error("No MediaStream available for recording.");
        return;
      }

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
      setIsRecording(true);
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };

    if (setting === "#MKE02$A22*") {
      if (data === "AD7" && !isRecording) {
        startRecording();
      } else if (data === "AE1") {
        stopRecording();
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
    }

    if (setting === "#MKE01$A11*") {
      if (data === "AG5" && !isRecording) {
        startRecording();
      } else if (data === "AG6") {
        stopRecording();
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
    }

    if (setting === "#MKE03$A33*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AJ5") {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
    }

    if (setting === "#MKE04$A44*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AF9") {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
    }

    return () => {
      if (isRecording) {
        stopRecording();
        setSocket(null);
      }
    };
  }, [data, selectedDevice, setting, setPhotos, isRecording]);

  return (
    <>
      <video ref={videoRef} autoPlay className={styles.video} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}
