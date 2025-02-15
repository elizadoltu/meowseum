import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const backgroundColors = [
    "#1d1616",
    "#ffd65a",
    "#006a67",
    "#fffaec",
    "#4b5945",
    "#16423c",
    "#dbdbdb",
    "#050505",
  ];
  const fontColors = [
    "#8e1616",
    "#f93827",
    "#16c47f",
    "#578e7e",
    "#b2c9ad",
    "#ff6500",
    "#050505",
    "#dbdbdb",
  ];

  const [themeIndex, setThemeIndex] = useState(() => {
    return parseInt(localStorage.getItem("themeIndex")) || 0;
  });

  useEffect(() => {
    applyTheme(themeIndex);
  }, [themeIndex]);

  const applyTheme = (index) => {
    document.body.style.color = fontColors[index];
    document.body.style.backgroundColor = backgroundColors[index];
  };

  const changeTheme = () => {
    const newIndex = (themeIndex + 1) % fontColors.length;
    setThemeIndex(newIndex);
    localStorage.setItem("themeIndex", newIndex);
    applyTheme(newIndex);
  };

  const value = useMemo(() => ({ changeTheme }), [changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
