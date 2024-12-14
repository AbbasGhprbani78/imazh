import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./DropDown.module.css";

const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiOutlinedInput-root": {
    fontFamily: "vazir",
    borderRadius: "8px",
    color: "#fff",
    fontSize: ".9rem",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "vazir",
    color: "#fff",
    fontSize: ".9rem",
    "&.Mui-focused": {
      color: "#fff",
      fontSize: ".9rem",
    },
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "#2e2e2e",
    color: "#fff",
    fontFamily: "vazir",
    fontSize: ".9rem",
  },
  "& .MuiAutocomplete-option": {
    backgroundColor: "#2e2e2e",
    fontFamily: "vazir",
    fontSize: ".9rem",
    "&:hover": {
      backgroundColor: "#424242",
    },
    "&[aria-selected='true']": {
      backgroundColor: "#424242",
    },
  },
  "& .MuiAutocomplete-input": {
    color: "#fff",
    fontFamily: "vazir",
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#fff",
  },
}));

export default function DropDownSearch({ firstoption, onFirstOptionClick, title }) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const options = [
    ...(firstoption ? [{ label: firstoption, isFirstOption: true }] : []),
    { label: "عباس قربانی" },
    { label: "علیرضا قربانی" },
    { label: "احمد اسماعیل زاده" },
  ];

  const handleChange = (event, value) => {
    if (value?.isFirstOption && onFirstOptionClick) {
      onFirstOptionClick();
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <StyledAutocomplete
        disablePortal
        id="searchable-dropdown"
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label={title} />}
        className={styles.dropDown_wrapper}
        disableClearable
        noOptionsText="گزینه‌ای وجود ندارد"
        onChange={handleChange}
      />
    </CacheProvider>
  );
}
