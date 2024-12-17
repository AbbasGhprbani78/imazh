"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.css";

export default function DropDownSearch({
  firstoptiontext,
  firstoptionclick,
  items,
  title,
  name,
  onChange,
  getOptionLabelProp
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setFilteredItems(
      items.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
    );
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

  const handleSelectItem = (item) => {
    setSearchValue(item[getOptionLabelProp]);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: item._id } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <div className={styles.wrapDropSearch} ref={dropdownRef}>
      <div
        className={`${styles.wrapInputData} ${
          isFocused || isOpen ? styles.focused : ""
        }`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          value={searchValue}
          placeholder=""
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.inputField}
          name={name}
          autoComplete="off"
        />
        <label className={styles.floatingLabel}>{title}</label>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {firstoptiontext && (
            <div className={styles.dropdownItem} onClick={firstoptionclick}>
              {firstoptiontext}
            </div>
          )}
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className={styles.dropdownItem}
                onClick={() => handleSelectItem(item)}
              >
                {item[getOptionLabelProp]}
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
