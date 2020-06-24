// Affiche l'avatar puis le nom du user un peu à droite
// présent dans les cardpreview et dans les cardPage

import React from "react";

import "./UserNameAndAvatarSmall.scss";
import {base} from "../../../services/configService"

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarSmall = ({ authorName, user }) => {

  return (
    <div className="UserNameAndAvatarSmall">
      <div className="UserNameAndAvatarSmall__avatar">
      
         <img
         className="UserNameAndAvatarSmall__userAvatar"
         src={user.profile[0] && base + user.profile[0].avatar}
         alt=""
       />

      </div>
      <p className="UserNameAndAvatarSmall__name">{authorName}</p>
    </div>
  );
};

export default UserNameAndAvatarSmall;
