import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "../../../components/UserComponents/UserAvatar/UserAvatar";
import UserUsername from "../../../components/UserComponents/UserAvatar/UserUsername";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";

import {
  selectCurrentUser,
  selectClickedUser,
} from "../../../redux/user/user-selectors";

import "./UserHeader.scss";
import { selectTheme } from "../../../redux/layout/layout-selectors";

const UserHeader = ({ userIsSame, location }) => {
  const locationPath = location && location.pathname;
  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const [userDatas, setUserDatas] = useState();

  useEffect(() => {
    if (locationPath && locationPath.includes("/account") && currentUser) {
      setUserDatas(currentUser);
    } else {
      setUserDatas(clickedUser);
    }
  }, [clickedUser, locationPath, currentUser]);

  return (
    <div className={`UserHeader ${currentTheme}-theme`}>
      <div className="UserHeader__userInfos">
        <div className="UserHeader__avatar">
          <UserAvatar user={currentUser} link={true} />
        </div>
        <div className="UserHeader__text">
          <h1 className="UserHeader__username title title-1">
            <UserUsername user={userDatas} link={true} />
          </h1>
          <p className="UserHeader__user-email">
            {userDatas && userDatas.email && userDatas.email}
          </p>
        </div>
        {userIsSame ? (
          <div className="UserHeader__mobile">
            <Link className="UserHeader__mobile--link" to="/account/user">
              <AccountLogo />
            </Link>
            <Link className="UserHeader__mobile--link" to="/account/settings">
              <SettingsLogo />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="UserHeader__bio">
        <p className="UserHeader__bio--text">
          {userDatas && userDatas.profile && userDatas.profile.description
            ? userDatas.profile.description
            : ""}
        </p>
      </div>
    </div>
  );
};

export default withRouter(UserHeader);
