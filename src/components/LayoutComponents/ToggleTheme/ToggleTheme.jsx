import React, { useEffect, useState } from "react";

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
        if (currentTheme === "light") {
          dispatch(toggleThemeAction("dark"));
          // setUserPref({ ...userPref, color_theme: "dark" });
        } else if (currentTheme === "dark") {
          dispatch(toggleThemeAction("light"));
          // setUserPref({ ...userPref, color_theme: "light" });
        }
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
