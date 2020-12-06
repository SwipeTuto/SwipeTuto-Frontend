import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./ConfidentialityPage.scss";

const ConfidentialityPage = () => {
  const currentTheme = useSelector(selectTheme);
  return <div className={`ConfidentialityPage ${currentTheme}-theme-d`}>Confidentiality page</div>;
};

export default ConfidentialityPage;
