"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.css";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { convertToPersianDate } from "@/utils/helper";

export default function DropDownSearch({
  firstoptiontext,
  firstoptionclick,
  items,
  title,
  name,
  onChange,
  getOptionLabelProp,
  isEdit,
  openEditModal,
  value,
  setIsNewOperation,
  style1,
  style2,
  setSetting,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setFilteredItems(items); 
    } else {
      setFilteredItems(
        items.filter((item) =>
          item[getOptionLabelProp].toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectItem = (item) => {
    const selectedLabel = item[getOptionLabelProp];
    setSearchValue(selectedLabel); 
    setSelectedValue(selectedLabel);
    if (setSetting) {
      setSetting(selectedLabel);
    }
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: item.id } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
 
    if (
      !filteredItems.some((item) => item[getOptionLabelProp] === searchValue)
    ) {
      setSearchValue("");
    }
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
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (name === "gender" && value !== "") {
      const genderLabel = value === "men" ? "مرد" : "زن";
      setSearchValue(genderLabel);
      setSelectedValue(genderLabel); 
    }
  }, [value]);

  return (
    <div
      className={`${styles.wrapDropSearch} ${styles[style1]}`}
      ref={dropdownRef}
    >
      <div
        className={`${styles.wrapInputData} ${
          isFocused || isOpen ? styles.focused : ""
        }`}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.inputField}
          name={name}
          autoComplete="off"
          placeholder=""
        />
        <label className={`${styles.floatingLabel} ${styles[style2]}`}>
          {title}
        </label>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {firstoptiontext && (
            <div
              className={styles.dropdownItem}
              onClick={() => {
                if (name === "operationDateId") {
                  setSearchValue("عملیات جدید");
                  setSelectedValue("عملیات جدید"); 
                }
                firstoptionclick();
                setIsOpen(false);
              }}
            >
              {firstoptiontext}
            </div>
          )}
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={styles.dropdownItem}
                onClick={() => {
                  handleSelectItem(item);
                  if (setIsNewOperation) {
                    setIsNewOperation(false);
                  }
                }}
              >
                {name === "operationDateId"
                  ? convertToPersianDate(item[getOptionLabelProp])
                  : item[getOptionLabelProp]}

                {isEdit && (
                  <ModeEditOutlinedIcon
                    className={styles.icon_edit}
                    onClick={() => openEditModal(item.id)}
                  />
                )}
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
