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
        item?.label?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectItem = (item) => {
    setSearchValue(item[getOptionLabelProp]);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: item.id } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
      setSearchValue(value === "men" ? "مرد" : "زن");
    }
  }, [value]);

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
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.inputField}
          name={name}
          autoComplete="off"
          placeholder=""
        />
        <label className={styles.floatingLabel}>{title}</label>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {firstoptiontext && (
            <div
              className={styles.dropdownItem}
              onClick={() => {
                name === "operationDateId" && setSearchValue("عملیات جدید");
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
 