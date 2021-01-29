import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./HelpPage.scss";

// ajouter un lien vers la page termes d'utilisation
const HelpPage = () => {
  const currentTheme = useSelector(selectTheme);
  return <div className={`HelpPage ${currentTheme}-theme-d`}>HelpPage</div>;
};

export default HelpPage;
