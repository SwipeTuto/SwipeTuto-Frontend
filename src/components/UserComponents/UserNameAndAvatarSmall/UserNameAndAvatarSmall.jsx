// Affiche l'avatar puis le nom du user un peu à droite
// présent dans les cardpreview et dans les cardPage

import React from "react";

import "./UserNameAndAvatarSmall.scss";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarSmall = ({ authorName }) => {
  return (
    <div className="UserNameAndAvatarSmall">
      <div className="UserNameAndAvatarSmall__avatar">
        {/* <img src="" alt="" /> */}
      </div>
      <p className="UserNameAndAvatarSmall__name">{authorName}</p>
    </div>
  );
};

export default UserNameAndAvatarSmall;
