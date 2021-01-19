import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { getCurrentUserAction, updateUserInfosAction } from "../../../redux/user/user-actions";
import { selectCurrentUser, selectCurrentUserId } from "../../../redux/user/user-selectors";

import "./PreferencesPage.scss";

const PreferencesPage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [userPref, setUserPref] = useState({
    topicPref: currentUser?.settings?.topicPref || null,
    categoryPref: currentUser?.settings?.categoryPref || null,
  });

  useEffect(() => {
    setCategoriesArray(getCategoriesArray(userPref.topicPref));
  }, [userPref.topicPref]);

  useEffect(() => {
    dispatch(
      updateUserInfosAction({
        ...currentUser,
        settings: {
          ...currentUser.settings,
          topicPref: userPref.topicPref,
          categoryPref: userPref.categoryPref,
        },
      })
    );
    currentUserId && dispatch(getCurrentUserAction(currentUserId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPref]);

  return (
    <div className={`SettingsPage PreferencesPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Changer les préférences</h2>
      <div className="allForms">
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
