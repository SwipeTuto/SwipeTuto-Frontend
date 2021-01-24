import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesArray } from "../../../helper/functions/getCategoriesArray";
import { topicArray } from "../../../helper/functions/getTopicsArray";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { getCurrentUserAction, updateUserInfosAction } from "../../../redux/user/user-actions";
import { selectCurrentUser, selectCurrentUserId } from "../../../redux/user/user-selectors";
import { ReactComponent as CheckLogo } from "../../../assets/images/checkmark-circle.svg";
import beaute from "../../../assets/images/illustrations/beaute.jpg";
import bienetre from "../../../assets/images/illustrations/bienetre.jpg";
import cuisine from "../../../assets/images/illustrations/cuisine.jpg";
import maison from "../../../assets/images/illustrations/maison.jpg";
import technologie from "../../../assets/images/illustrations/technologie.jpg";

import "./PreferencesPage.scss";
import { getNameFromQueryName } from "../../../helper/functions/getNameFromQueryName";
import { urlParams } from "../../../helper/functions/getURLParams";

const PreferencesPage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const [userPref, setUserPref] = useState({
    topicPref: currentUser?.settings?.topicPref || null,
    categoryPref: currentUser?.settings?.categoryPref || null,
  });

  // useEffect(() => {
  //   setCategoriesArray(getCategoriesArray(userPref.topicPref));
  // }, [userPref.topicPref]);

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
        <p className="FormInput__label">Veuillez cocher vos préférences afin que nous puissions vous proposer du contenu personnalisé :</p>

        {topicArray.map(
          (topic, index) =>
            topic.queryName !== null && (
              <div
                className="PreferencesPage__topic PreferencesPage__form form"
                style={{ backgroundImage: `url(${require("../../../assets/images/illustrations/" + topic.queryName + ".jpg")}) ` }}
              >
                <form>
                  <div className="PreferencesPage__topic--input">
                    <input type="checkbox" name={`${topic.queryName}-all`} id={`${topic.queryName}-all`} />
                    <label htmlFor={`${topic.queryName}-all`}>{`${topic.name} - Général`}</label>
                  </div>
                  <div className="PreferencesPage__category">
                    {getCategoriesArray(topic.queryName).map(
                      (category, index) =>
                        category.queryName !== null &&
                        category.queryName !== "autre" && (
                          <div className="PreferencesPage__category--input">
                            <input type="checkbox" name={`${category.queryName}-all`} id={`${category.queryName}-${topic.queryName}`} />
                            <label htmlFor={`${category.queryName}-${topic.queryName}`}>{`${category.name}`}</label>
                          </div>
                        )
                    )}
                  </div>
                </form>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PreferencesPage;
