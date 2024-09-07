import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext";

function ThemeSelect({ onChange }) {
  const themeDark = useContext(ThemeContext);
  const handleChange = (e) => {
    const value = e.target.value === "dark";
    onChange(value);
  };
  return (
    <select
      className="bg-grey font-semibold text-gray-500 cursor-pointer hover:bg-green rounded-xl p-1"
      value={themeDark}
      onChange={handleChange}
    >
      <option value="">Mode</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}

export default ThemeSelect;
