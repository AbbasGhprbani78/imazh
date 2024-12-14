import { useState } from "react";
import styles from "./SearchBox.module.css";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchBox() {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
