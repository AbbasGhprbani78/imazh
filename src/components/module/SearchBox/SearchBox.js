"use client";
import styles from "./SearchBox.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { convertToFarsiDigits, toEnglishNumber } from "@/utils/helper";  

export default function SearchBox({ value, onChange }) {
  const handleInputChange = (e) => {
    const englishValue = toEnglishNumber(e.target.value); 
    onChange({ ...e, target: { ...e.target, value: englishValue } }); 
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={convertToFarsiDigits(value)}
        onChange={handleInputChange}
        autoComplete="off"
        maxLength={70}
        placeholder="جستجو"
        className={styles.input_search}
      />
      <div className={styles.wrap_icon}>
        <SearchIcon className={styles.icon} />
      </div>
    </div>
  );
}
