import React from "react";

import { ReactComponent as LogoSun } from "../../../assets/images/sunny.svg";
import { ReactComponent as LogoMoon } from "../../../assets/images/moon.svg";

import "./ToggleTheme.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { toggleThemeAction } from "../../../redux/layout/layout-actions";

const ToggleButton = () => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        if (currentTheme === "light") dispatch(toggleThemeAction("dark"));
        if (currentTheme === "dark") dispatch(toggleThemeAction("light"));
      }}
      className="ToggleTheme"
    >
      {currentTheme === "light" ? (
        <>
          Thème Sombre
          <LogoMoon className="ToggleTheme__logo" />
        </>
      ) : (
        <>
          Thème Clair
          <LogoSun className="ToggleTheme__logo" />
        </>
      )}
    </button>
  );
};

export default ToggleButton;
