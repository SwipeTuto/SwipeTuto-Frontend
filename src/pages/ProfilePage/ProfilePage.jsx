import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import { selectCurrentUser, selectUserErrors } from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { getUrlId, initialSignalState } from "../../helper";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { showSignalPopup } from "../../redux/layout/layout-actions";

const ProfilePage = ({ match, location }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectTheme);
  const userErrors = useSelector(selectUserErrors);
  const [userIsSame, setUserIsSame] = useState(false);
  const userId = getUrlId(location.pathname, "user_id") || null;

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
          <>
            {userIsSame ? (
              <Link to="/account/user">
                <CustomButton color="dark">Gérer le compte</CustomButton>
              </Link>
            ) : (
              <>
                <CustomButton color="dark" onClick={() => dispatch(showSignalPopup(newSignalObject))}>
                  Signaler
                </CustomButton>
              </>
            )}
            <UserPage userIsSame={userIsSame} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
