import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "../../../components/UserComponents/UserAvatar/UserAvatar";
import { ReactComponent as SettingsLogo } from "../../../assets/images/settings.svg";
import { ReactComponent as AccountLogo } from "../../../assets/images/person.svg";

import "./UserHeader.scss";
import {
  selectCurrentUser,
  selectOtherUser,
} from "../../../redux/user/user-selectors";

const UserHeader = ({ user }) => {
  // user = current pour user actuel
  // user = other pour la visite d'un autre profil
  const currentUser = useSelector(selectCurrentUser);
  const otherUser = useSelector(selectOtherUser);
  const [userDatas, setUserDatas] = useState();

  useEffect(() => {
    if (user === "current") {
      setUserDatas(currentUser);
    } else if (user === "other") {
      setUserDatas(otherUser);
    } else {
      setUserDatas(null);
    }
    console.log(userDatas);
  }, [user]);

  return (
    <div className="UserHeader">
      <div className="UserHeader__userInfos">
        <div className="UserHeader__avatar">
          <UserAvatar
            userImage={
              userDatas && userDatas.profile && userDatas.profile.avatar
                ? userDatas.profile.avatar
                : null
            }
            userFirstName={
              userDatas && userDatas.first_name ? userDatas.first_name : null
            }
            userLastName={
              userDatas && userDatas.last_name ? userDatas.last_name : null
            }
          />
        </div>
        <div className="UserHeader__text">
          <h1 className="UserHeader__username title title-1">
            {userDatas && userDatas.username
              ? userDatas.username
              : "Utilisateur SwipeTuto"}
          </h1>
          <p className="UserHeader__user-email">
            {userDatas && userDatas.email && userDatas.email}
          </p>
        </div>
        {user === "current" ? (
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
      <div className="UserHeader__social">
        {/* <a href="#" target="_blank" className="UserHeader__social--link">
      <LogoYoutube className="UserHeader__social--logo" />
    </a>
    <a href="#" target="_blank" className="UserHeader__social--link">
      <LogoGithub className="UserHeader__social--logo" />
    </a>
    <a href="#" target="_blank" className="UserHeader__social--link">
      <LogoFacebook className="UserHeader__social--logo" />
    </a>
    <a href="#" target="_blank" className="UserHeader__social--link">
      <LogoTwitter className="UserHeader__social--logo" />
    </a> */}
      </div>
    </div>
  );
};

export default UserHeader;
