import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";

import "./PreferencesPage.scss";
import ChooseFavourites from "../../../components/LayoutComponents/ChooseFavorites/ChooseFavourites";

const PreferencesPage = () => {
  const currentTheme = useSelector(selectTheme);

  return (
    <div className={`SettingsPage PreferencesPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changer les préférences</h2>
      <div className="allForms">
        <p className="FormInput__label">Veuillez cocher vos préférences afin que nous puissions vous proposer du contenu personnalisé :</p>
        <ChooseFavourites />
      </div>
    </div>
  );
};

export default PreferencesPage;
