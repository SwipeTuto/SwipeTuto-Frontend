import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserNameAndAvatarBig.scss";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarBig = ({ authorName }) => {
 const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="UserNameAndAvatarBig">
      <div className="UserNameAndAvatarBig__avatar NavTop__avatar--userAvatar">
        <img  style={{width:'100%', height:'100%'}} className='NavTop__avatar--userAvatar' src={currentUser && currentUser.profile.avatar} alt="" />
      </div>
      <p className="UserNameAndAvatarBig__name">{authorName}</p>
    </div>
  );
};

export default UserNameAndAvatarBig;
