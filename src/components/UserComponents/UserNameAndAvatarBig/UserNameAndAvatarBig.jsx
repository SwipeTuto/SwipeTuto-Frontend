import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserNameAndAvatarBig.scss";
import {
  selectCurrentUser,
  selectUser,
} from "../../../redux/user/user-selectors";
import UserAvatar from "../UserAvatar/UserAvatar";
import { selectClickedCard } from "../../../redux/cards/cards-selectors";
import { base } from "../../../services/configService";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarBig = ({ userObject }) => {
  const clickedCard = useSelector(selectClickedCard);

  return (
    <div className="UserNameAndAvatarBig">
      <div className="UserNameAndAvatarBig__avatar NavTop__avatar--userAvatar">
        {clickedCard && (
          <UserAvatar
            userImage={base + userObject.profile[0].avatar}
            userFirstName={userObject.first_name}
            userLastName={userObject.last_name}
          />
        )}
      </div>
      <p className="UserNameAndAvatarBig__name">
        {clickedCard && userObject.username}
      </p>
    </div>
  );
};

export default UserNameAndAvatarBig;
