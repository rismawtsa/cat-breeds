import { useState } from "react";
import styles from "./search.module.css";

export default function Search({ onSearch, onClear }) {
  const [query, setQuery] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClearClick = () => {
    setQuery("");
    onClear();
  };

  let searchWrapperStyle = styles.searchWrapper;
  if (isFocus) {
    searchWrapperStyle += " " + styles.focus;
  }

  return (
    <div className={searchWrapperStyle}>
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {query && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
