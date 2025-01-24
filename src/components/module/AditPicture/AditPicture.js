"use client";
import { useState } from "react";
import styles from "./AditPicture.module.css";
import InputRange from "../InputRange/InputRange";
import Button2 from "../Buttons/Button2";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { MdDeblur } from "react-icons/md";
import { MdOutlineOpacity } from "react-icons/md";
import { IoIosContrast } from "react-icons/io";
import { LiaTintSolid } from "react-icons/lia";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import { MdTune } from "react-icons/md";

export default function AditPicture({ filters, setFilters, onClick }) {
  const [activeParam, setActiveParam] = useState(null);

  const handleFilterChange = (param, value) => {
    setFilters((prev) => ({ ...prev, [param]: value }));
  };

  const params = [
    {
      id: "contrast",
      label: "شدت کنتراست",
      min: 0,
      max: 200,
      icon: IoIosContrast,
    },
    {
      id: "brightness",
      label: "روشنایی تصویر",
      min: 0,
      max: 200,
      icon: LightModeIcon,
    },
    {
      id: "grayscale",
      label: "شدت سیاه و سفید",
      min: 0,
      max: 100,
      icon: MdDeblur,
    },
    {
      id: "saturation",
      label: "شدت اشباع رنگ",
      min: 0,
      max: 200,
      icon: LiaTintSolid,
    },
    { id: "sepia", label: "شدت سپیا", min: 0, max: 100, icon: Brightness6Icon },
    {
      id: "hue",
      label: "چرخش رنگ",
      min: 0,
      max: 360,
      icon: WorkspacesOutlinedIcon,
    },
    {
      id: "opacity",
      label: "شفافیت",
      min: 0,
      max: 100,
      icon: MdOutlineOpacity,
    },
  ];

  return (
    <>
      <div className={styles.container_actions}>
        {params.map((param) => (
          <Tooltip
            key={param.id}
            title={param.label}
            arrow
            placement="top"
            className={styles.tooltip}
          >
            <div>
              <Button2
                icon={param.icon}
                onClick={() =>
                  setActiveParam(activeParam === param.id ? null : param.id)
                }
              />
            </div>
          </Tooltip>
        ))}
        <Button2 onClick={onClick} icon={MdTune} />
      </div>
      <div className={styles.wrap_input}>
        {activeParam && (
          <InputRange
            min={params.find((p) => p.id === activeParam).min}
            max={params.find((p) => p.id === activeParam).max}
            value={filters[activeParam]}
            onChange={(e) => handleFilterChange(activeParam, e.target.value)}
          />
        )}
      </div>
    </>
  );
}
