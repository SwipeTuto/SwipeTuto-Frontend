import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserHeader from "../AccountPages/UserHeader/UserHeader";

import { getUserByIdAction } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import { selectCurrentUser, selectUserErrors } from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
// import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import { getUrlId, initialSignalState } from "../../helper";
import { selectTheme } from "../../redux/layout/layout-selectors";
import VerticalMenu from "../../components/LayoutComponents/VerticalMenu/VerticalMenu";
import { showSignalPopup } from "../../redux/layout/layout-actions";

const ProfilePage = ({ match, location }) => {
  const dispatch = useDispatch();
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

  const newSignalObject = {
    ...initialSignalState,
    id_user: parseInt(userId),
  };

  return (
    <div className={`ProfilePage ${currentTheme}-theme`}>
      <div className="ProfilePage__wrapper">
        {userErrors ? (
          <div className="ProfilePage__error">
            <h3 className="title title-3">Le profil de cet utilisateur n'a pas été trouvé.</h3>
            <Link to="/">
              <CustomButton>Revenir à l'accueil</CustomButton>
            </Link>
          </div>
        ) : (
          <>
            {!userIsSame && (
              <VerticalMenu className="ProfilePage__link">
                <p className="VerticalMenu__menu--item" onClick={() => dispatch(showSignalPopup(newSignalObject))}>
                  Signaler
                </p>
              </VerticalMenu>
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
