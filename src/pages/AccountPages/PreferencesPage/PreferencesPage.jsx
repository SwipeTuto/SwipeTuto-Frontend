import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/FormInputs/FormInput";
import FormSelect from "../../../components/FormInputs/FormSelect";
import CustomButton from "../../../components/LayoutComponents/CustomButton/CustomButton";
import { getCategoriesArray, topicArray } from "../../../helper";
import { toggleThemeAction } from "../../../redux/layout/layout-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

import "./PreferencesPage.scss";

const PreferencesPage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [userPref, setUserPref] = useState({
    color_theme: "",
    card_size: "",
    topicPref: null,
    categoryPref: null,
  });

  useEffect(() => {
    setCategoriesArray(getCategoriesArray(userPref.topicPref));
  }, [userPref.topicPref]);

  useEffect(() => {
    if (currentUser && currentUser.settings) {
      setUserPref({
        color_theme: currentUser?.settings?.color_theme,
        card_size: currentUser.settings?.card_size,
        topicPref: currentUser.settings?.topicPref,
        categoryPref: currentUser.settings?.categoryPref,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    // console.log(userPref);
    // action pour modif l'objet settings de user en back avec userPref
  }, [userPref]);

  return (
    <div className={`SettingsPage PreferencesPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changer les préférences</h2>
      <div className="allForms">
        <form className="form__color-theme form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence des couleurs du thème :</p>
            <div className="form__options">
              <input
                type="radio"
                id="light-theme"
                name="color-theme"
                value="light"
                checked={userPref.color_theme === "light" ? "checked" : null}
                onClick={() => {
                  dispatch(toggleThemeAction("light"));
                  setUserPref({ ...userPref, color_theme: "light" });
                }}
              />
              <label htmlFor="light-theme">Thème clair</label>
              <input
                type="radio"
                id="dark-theme"
                name="color-theme"
                value="dark"
                checked={userPref.color_theme === "dark" ? "checked" : null}
                onClick={() => {
                  dispatch(toggleThemeAction("dark"));
                  setUserPref({ ...userPref, color_theme: "dark" });
                }}
              />
              <label htmlFor="dark-theme">Thème sombre</label>
            </div>
          </div>
          {/* <CustomButton onClick={(e) => handleSubmitInput(e)} color="dark">
            Valider
          </CustomButton> */}
        </form>
        <form className="form__card-size form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence de la taille d'affichage des cartes :</p>
            <div className="form__options">
              <input
                type="radio"
                id="small-cards"
                name="card-size"
                value="small"
                checked={userPref.card_size === "small" ? "checked" : null}
                onClick={() => {
                  setUserPref({ ...userPref, card_size: "small" });
                }}
              />
              <label htmlFor="small-cards">Petites cartes</label>
              <input
                type="radio"
                id="big-cards"
                name="card-size"
                value="big"
                checked={userPref.card_size === "big" ? "checked" : null}
                onClick={() => {
                  setUserPref({ ...userPref, card_size: "big" });
                }}
              />
              <label htmlFor="big-cards">Grandes cartes</label>
            </div>
          </div>
          {/* <CustomButton onClick={(e) => handleSubmitInput(e)} color="dark">
            Valider
          </CustomButton> */}
        </form>
        <form className="form__topicPref form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence de la catégorie :</p>
            <div className="form__options">
              {topicArray.map((topic, index) => (
                <>
                  <input
                    className="FiltersBarMobile__input-radio"
                    type="radio"
                    id={"topicPref" + index}
                    name="searchTopic"
                    onClick={(e) => {
                      setCategoriesArray(getCategoriesArray(e.target.value));
                      setUserPref({ ...userPref, topicPref: e.target.value || null });
                    }}
                    value={topic.queryName || ""}
                    checked={userPref.topicPref === topic.queryName}
                  />
                  <label htmlFor={"topicPref" + index}>{topic.name}</label>
                </>
              ))}
            </div>
          </div>
        </form>
        <form className="form__categoryPref form">
          <div className="form__bottom">
            <p className="FormInput__label">Préférence de la sous-catégorie :</p>
            <div className="form__options">
              {categoriesArray.map((category, index) => (
                <>
                  <input
                    className="FiltersBarMobile__input-radio"
                    type="radio"
                    id={"categoryPref" + index}
                    name="searchCategory"
                    onClick={(e) => {
                      setUserPref({ ...userPref, categoryPref: e.target.value || null });
                    }}
                    value={category.queryName || ""}
                    checked={userPref.categoryPref === category.queryName}
                  />
                  <label htmlFor={"categoryPref" + index}>{category.name}</label>
                </>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferencesPage;
