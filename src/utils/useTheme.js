import { useState, useEffect } from "react";
import storage from "local-storage-fallback";

export const useTheme = (defaultTheme = { mode: "light" }) => {
  const [theme, _setTheme] = useState(getInitialTheme);
  localStorage.setItem("currentTheme", theme.mode);

  function getInitialTheme() {
    const savedTheme = storage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  }

  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return {
    ...theme,
    theme,
    setTheme: ({ setTheme, ...theme }) => {
      _setTheme(theme);
    },
  };
};
