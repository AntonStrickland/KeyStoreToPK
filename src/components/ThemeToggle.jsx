import { useState, useEffect } from "react";
 
const ThemeToggle = () => {

  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    if (!mounted) {
      setTheme(localStorage.getItem('theme'));
      setMounted(true);
    }
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const themes = ["light", "dark"];
 
  const toggleTheme = () => {

    const themeIndex = themes.indexOf(theme);
    const nextIndex = themeIndex + 1 > themes.length ? 0 : themeIndex + 1;

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