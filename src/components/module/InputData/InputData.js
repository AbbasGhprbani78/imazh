"use client"
import { useState } from "react";
import styles from "./InputData.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function InputData({ label }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${styles.wrapInputData} ${
        focused || value ? styles.focused : ""
      }`}
    >
      <label className={styles.floatingLabel}>{label}</label>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value}
        onChange={setValue}
        format="YYYY/MM/DD HH:mm"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: "none",
          background: "transparent",
          outline: "none",
          width: "100%",
          height: "100%",
          color: "#fff",
          fontFamily: "vazir",
          textAlign: "center",
        }}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        plugins={[<TimePicker position="bottom" />]}
      />
    </div>
  );
}
