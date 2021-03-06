import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./NextPage.scss";

const NextPage = () => {
  const currentTheme = useSelector(selectTheme);
  return (
    <div className={`NextPage ${currentTheme}-theme-d`}>
      <div className={`NextPage__content ${currentTheme}-theme-m`}>
        <h2 className="title title-2">Quelles seront les futures nouveautés ?</h2>
        <p>
          Swipetuto est en constante évolution. Voici un listing non exhaustif de toutes les nouveautés que nous prévoyons d'implémenter à l'avenir :
        </p>
        <ul>
          <li>Un système de création d'image directement implémenté dans le site</li>
        </ul>
      </div>
    </div>
  );
};

export default NextPage;
