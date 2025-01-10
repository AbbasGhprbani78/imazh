"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.css";

export default function NormalDropDown({
  onChange,
  value,
  title,
  items,
  name,
  style2,
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectItem = (item) => {
    const selectedLabel = item.id;
    setSelectedValue(selectedLabel);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: item.id } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  return (
    <div className={styles.wrapDropSearch} ref={dropdownRef}>
      <div
        className={`${styles.wrapInputData} ${isOpen ? styles.focused : ""}`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          value={selectedValue}
          readOnly
          className={styles.inputField}
          name={name}
          autoComplete="off"
        />
        <label className={`${styles.floatingLabel} ${styles[style2]}`}>
          {title}
        </label>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {items?.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className={styles.dropdownItem}
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className={styles.noOptions}>گزینه‌ای وجود ندارد</div>
          )}
        </div>
      )}
    </div>
  );
}
