import React from "react";
import "./UserNameAndAvatarBig.scss";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarBig = ({ authorName }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="UserNameAndAvatarBig">
      <div className="UserNameAndAvatarBig__avatar NavTop__avatar--userAvatar">
        <img  style={{width:'100%', height:'100%'}} className='NavTop__avatar--userAvatar' src={user && user.avatar} alt="" />
      </div>
      <p className="UserNameAndAvatarBig__name">{authorName}</p>
    </div>
  );
};

export default UserNameAndAvatarBig;
