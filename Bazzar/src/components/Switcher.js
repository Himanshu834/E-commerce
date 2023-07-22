import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./Theme";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        // style={{ marginBottom: "2rem",marginTop: "2rem" }}
        // className="w-full"
        checked={darkSide}
        onChange={toggleDarkMode}
        size={25}
      />
    </>
  );
}
