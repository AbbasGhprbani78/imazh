import React from "react";

export default function InputRange({ min, max, value, onChange }) {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{ width: "100%" }}
      />
    </div>
  );
}
