import { useState } from "react";
import styles from "./error.module.css";
export default function Search({ onSearch, onClear }) {
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  const handleClearClick = () => {
    setName("");
    onClear();
  };
  const handleSearchClick = () => {
    onSearch(name);
  };
  return (
    <div style={styles.searchWrapper}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={handleInputChange}
      />
      <button onClick={handleClearClick}>Clear</button>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}
