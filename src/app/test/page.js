"use client";
import axios from "axios";
import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    setStatus("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("backup", file);

  try {
    setStatus("Uploading...");
    const response = await axios.post(
      "http://localhost:3000/api/backup/restorebackup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      setStatus("Backup restored successfully!");
    } else {
      setStatus(`Error: ${response.data.error || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    setStatus(`Error: ${error.response?.data?.error || "Server error"}`);
  }
};

  return (
    <div>
      <h1>Restore Backup</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".zip" onChange={handleFileChange} required />
        <button type="submit">Restore</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
