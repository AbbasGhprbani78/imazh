import React, { useEffect } from "react";
import styles from "./LagTab.module.css";
import axios from "axios";
export default function LogTab() {
  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/log");
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLogs();
  }, []);
  return <div className="animationcome">LogTab</div>;
}
