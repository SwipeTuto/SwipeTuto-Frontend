import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserHeader from "../AccountPages/UserHeader/UserHeader";

import { setOtherUser } from "../../redux/user/user-actions";

import "./ProfilePage.scss";
import UserPage from "../AccountPages/UserPage/UserPage";
import {
  selectCurrentUser,
  selectOtherUser,
} from "../../redux/user/user-selectors";
import CustomButton from "../../components/LayoutComponents/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { ReactComponent as AccountLogo } from "../../assets/images/person.svg";

const ProfilePage = ({ match }) => {
  const [user, setUser] = useState();
  const currentUser = useSelector(selectCurrentUser);
  const otherUser = useSelector(selectOtherUser);
  const [userIsSame, setUserIsSame] = useState(false);
  const dispatch = useDispatch();

  // scroll reset
  if (window.scrollY) {
    window.scroll(0, 0);
  }

  useEffect(() => {
    if (match.params && match.params.user_id) {
      const urlUserId = parseInt(match.params.user_id);
      if (currentUser && urlUserId === currentUser.id) {
        console.log(urlUserId, currentUser.id);
        setUser("current");
        setUserIsSame(true);
      } else {
        setUser("other");
        dispatch(setOtherUser(urlUserId));
        setUserIsSame(false);
      }
      // ACTION A FAIRE :
    }
  }, [match.params]);

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
        <UserHeader user={user} />
        <UserPage user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
