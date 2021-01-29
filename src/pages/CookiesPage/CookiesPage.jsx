import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";
import "./CookiesPage.scss";

const CookiesPage = () => {
  const currentTheme = useSelector(selectTheme);
  return <div className={`CookiesPage ${currentTheme}-theme-d`}>Cookies Page</div>;
};

export default CookiesPage;
