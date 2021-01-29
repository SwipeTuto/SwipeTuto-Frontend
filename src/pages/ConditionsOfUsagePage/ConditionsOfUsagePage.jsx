import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./ConditionsOfUsagePage.scss";

const ConditionsOfUsagePage = () => {
  const currentTheme = useSelector(selectTheme);
  return <div className={`ConditionsOfUsagePage ${currentTheme}-theme-d`}>Termes d'utilisation</div>;
};

export default ConditionsOfUsagePage;
