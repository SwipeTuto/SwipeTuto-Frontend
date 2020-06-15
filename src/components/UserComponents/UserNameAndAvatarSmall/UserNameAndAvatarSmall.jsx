// Affiche l'avatar puis le nom du user un peu à droite
// présent dans les cardpreview et dans les cardPage

import React from "react";

import "./UserNameAndAvatarSmall.scss";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarSmall = ({ authorName }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="UserNameAndAvatarSmall">
      <div className="UserNameAndAvatarSmall__avatar">
      <img  style={{width:'100%', height:'100%'}} className='NavTop__avatar--userAvatar' src={user && user.avatar} alt="" />
      </div>
      <p className="UserNameAndAvatarSmall__name">{authorName}</p>
    </div>
  );
};

export default UserNameAndAvatarSmall;
