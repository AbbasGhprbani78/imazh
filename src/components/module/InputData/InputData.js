"use client";
import { useState } from "react";
import styles from "./InputData.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function InputData({ label, value, onChange, name }) {
  const [focused, setFocused] = useState(false);

  
  return (
    <div
      className={`${styles.wrapInputData} ${
        focused || value ? styles.focused : ""
      }`}
    >
      <label className={styles.floatingLabel}>{label}</label>
      <DatePicker
        name={name}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value}
        onChange={onChange}
        format="YYYY/MM/DD HH:mm"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={styles.data_calender}
        style={{
          border: "none",
          background: "transparent",
          outline: "none",
          width: "100%",
          height: "100%",
          fontFamily: "vazir",
          textAlign: "center",
          color:"var(--color-5)"
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
