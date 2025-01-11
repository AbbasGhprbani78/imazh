"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
  const [format, setFormat] = useState("");
  const [settingVideo, setSettingVideo] = useState({
    resolution: "",
    videoDelay: "",
    format: "",
  });

  const getResolutionDimensions = (resolution) => {
    switch (resolution) {
      case "4k":
        return { width: 3840, height: 2160 };
      case "1080p":
        return { width: 1920, height: 1080 };
      case "720p":
        return { width: 1280, height: 720 };
      case "480p":
        return { width: 640, height: 480 };
      default:
        return { width: 1920, height: 1080 };
    }
  };

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
          const { width, height } = getResolutionDimensions(
            settingVideo.resolution
          );
          const constraints = {
            video: {
              deviceId: { exact: selectedDevice },
              width: width,
              height: height,
            },
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        context.drawImage(videoRef.current, 0, 0, width, height);
        const imageFormat = format || "png";
        const imageUrl = canvasRef.current.toDataURL(`image/${imageFormat}`);
        setPhotos((prevPhotos) => [...prevPhotos, imageUrl]);
      }
    };

    const startRecording = () => {
      const stream = streamRef.current;
      if (!stream) {
        console.error("No MediaStream available for recording.");
        return;
      }

      try {
        const options = {
          mimeType: `video/${settingVideo.format}`,
        };
        mediaRecorderRef.current = new MediaRecorder(stream, options);

        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, {
            type: `video/${settingVideo.format}`,
          });
          const videoURL = URL.createObjectURL(blob);
          setPhotos((prevPhotos) => [...prevPhotos, videoURL]);
        };

        mediaRecorderRef.current.onerror = (event) => {
          console.error("MediaRecorder error:", event.error);
        };

        mediaRecorderRef.current.start();
        console.log("Recording started...");
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting MediaRecorder:", error);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
        console.log("Stopping recording...");
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };

    const cleanup = () => {
      if (
        socket &&
        (data === "AG6" || data === "AE1" || data === "AJ5" || data === "AF9")
      ) {
        socket.disconnect();
        setSocket(null);
      }
    };

    startCamera();

    if (setting === "#MKE01$A11*") {
      if (data === "AG5" && !isRecording) {
        startRecording();
      } else if (data === "AG6") {
        stopRecording();
        cleanup();
      }
    }

    if (setting === "#MKE02$A22*") {
      if (data === "AD7" && !isRecording) {
        startRecording();
      } else if (data === "AE1") {
        stopRecording();
        cleanup();
      }
    }

    if (setting === "#MKE03$A33*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AJ5") {
        cleanup();
      }
    }

    if (setting === "#MKE04$A44*") {
      if (data === "AF1" && !isRecording) {
        captureImage();
      } else if (data === "AF9") {
        cleanup();
      }
    }
  }, [data, selectedDevice, setting, setPhotos, isRecording, socket]);

  useEffect(() => {
    const fetchSettingsVideo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/videosetting"
        );
        if (response.status === 200) {
          setSettingVideo({
            resolution: response?.data.resolution,
            videoDelay: response?.data.videoDelay,
            format: response?.data.format,
          });
        }
      } catch (error) {
        console.error("Error fetching video settings:", error);
      }
    };

    const fetchSettingsPhoto = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/photosetting"
        );
        if (response.status === 200) {
          setFormat(response?.data.format);
        }
      } catch (error) {
        console.error("Error fetching video settings:", error);
      }
    };

    fetchSettingsVideo();
    fetchSettingsPhoto();
  }, []);

  return (
    <>
      <video ref={videoRef} autoPlay className={styles.video} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}
