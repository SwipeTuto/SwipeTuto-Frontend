import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserHeader from "../AccountPages/UserHeader/UserHeader";

import { getUserByIdAction } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import {
  selectCurrentUser,
  selectClickedUser,
} from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";
import { urlParams, getUrlId } from "../../helper";

const ProfilePage = ({ match, location }) => {
  const [user, setUser] = useState();
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const [userIsSame, setUserIsSame] = useState(false);
  const dispatch = useDispatch();
  // const [userId, setUserId] = useState();
  const userId = getUrlId(location.pathname, "user_id") || null;

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  useEffect(() => {
    // const urlUserId = match.params.user_id ? match.params.user_id : null;
    if (userId) {
      // setUserId(urlUserId);
      getUserByIdAction(userId);
      if (currentUser && userId === currentUser.id) {
        setUserIsSame(true);
      } else {
        setUserIsSame(false);
      }
    }
  }, []);

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__wrapper">
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
        <UserHeader user={user} userId={userId} />
        <UserPage user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
