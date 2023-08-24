import { useState } from "react";
import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  function submit(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      onSubmit(event.target.value);
      setValue("");
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        onChange={handleChange}
        type="text"
        value={value}
        className={s.input}
        placeholder={"Search a TV show you may like"}
      />
    </div>
  );
}
