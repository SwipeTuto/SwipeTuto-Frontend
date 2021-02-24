import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import { selectCurrentUser, selectUserErrors } from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { getUrlId } from "../../helper/functions/getURLParams";
import { selectTheme } from "../../redux/layout/layout-selectors";

const ProfilePage = ({ match, location }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const userErrors = useSelector(selectUserErrors);
  const [userIsSame, setUserIsSame] = useState(false);
  const userId = getUrlId(location.pathname, "user_id") || null;

  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdAction(parseInt(userId)));
      if (currentUser && userId === currentUser.id) {
        setUserIsSame(true);
      } else {
        setUserIsSame(false);
      }
    }
  }, [currentUser, dispatch, userId]);

  return (
    <div className={`ProfilePage ${currentTheme}-theme-d`}>
      <div className="ProfilePage__wrapper">
        {userErrors ? (
          <div className="ProfilePage__error">
            <h3 className="title title-3">Le profil de cet utilisateur n'a pas été trouvé.</h3>
            <Link to="/">
              <CustomButton>Revenir à l'accueil</CustomButton>
            </Link>
          </div>
        ) : (
          <UserPage userIsSame={userIsSame} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
