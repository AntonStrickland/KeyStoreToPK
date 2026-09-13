import { useState, useEffect } from "react";
 
const ThemeToggle = () => {

  const themes = ["light", "dark"];

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return themes.includes(saved) ? saved : "light";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {

    const themeIndex = themes.indexOf(theme);
    const nextIndex = (themeIndex + 1) % themes.length;

    localStorage.setItem('theme', themes[nextIndex]);
    setTheme(themes[nextIndex]);
  }
 
  return (
    <div className=" ">
      <button
        className="rounded-lg border
          bg-white dark:bg-black coffee:bg-orange-950
          text-black dark:text-white coffee:text-orange-200
          cursor-pointer"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
}
 
export default ThemeToggle;