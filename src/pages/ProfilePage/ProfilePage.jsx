import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserHeader from "../AccountPages/UserHeader/UserHeader";

import { getUserByIdAction } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import {
  selectCurrentUser,
  selectUserErrors,
} from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import { getUrlId } from "../../helper";
import { selectTheme } from "../../redux/layout/layout-selectors";

const ProfilePage = ({ match, location }) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const userErrors = useSelector(selectUserErrors);
  const [userIsSame, setUserIsSame] = useState(false);
  const userId = getUrlId(location.pathname, "user_id") || null;

  // scroll reset
  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userId) {
      getUserByIdAction(userId);
      if (currentUser && userId === currentUser.id) {
        setUserIsSame(true);
      } else {
        setUserIsSame(false);
      }
    }
  }, [currentUser, userId]);

  return (
    <div className={`ProfilePage ${currentTheme}-theme`}>
      <div className="ProfilePage__wrapper">
        {userErrors ? (
          <div className="ProfilePage__error">
            <h1>Le profil de cet utilisateur n'a pas été trouvé.</h1>
            <Link to="/">
              <CustomButton>Revenir à l'accueil</CustomButton>
            </Link>
          </div>
        ) : (
          <>
            {userIsSame && (
              <div className="ProfilePage__link">
                <Link to="/account/user">
                  <CustomButton color="dark">
                    <AccountLogo />
                    Gérer votre compte
                  </CustomButton>
                </Link>
              </div>
            )}
            <UserHeader userIsSame={userIsSame} />
            <UserPage userIsSame={userIsSame} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
