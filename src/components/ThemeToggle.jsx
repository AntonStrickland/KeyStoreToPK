import { useState, useEffect } from 'react';

const themes = ['light', 'dark'];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return themes.includes(saved) ? saved : 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      className="rounded-lg border px-2 bg-white dark:bg-black text-black dark:text-white cursor-pointer"
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
