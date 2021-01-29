import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./HelpPage.scss";

const HelpPage = () => {
  const currentTheme = useSelector(selectTheme);
  return <div className={`HelpPage ${currentTheme}-theme-d`}>HelpPage</div>;
};

export default HelpPage;
