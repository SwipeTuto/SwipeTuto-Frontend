import React from "react";

import "./UserNameAndAvatarBig.scss";

// Faire vérif taille username : si trop grand (à définir) tronquer avec "..."
const UserNameAndAvatarBig = () => {
  return (
    <div className="UserNameAndAvatarBig">
      <div className="UserNameAndAvatarBig__avatar">
        {/* <img src="" alt="" /> */}
      </div>
      <p className="UserNameAndAvatarBig__name">Wikode</p>
    </div>
  );
};

export default UserNameAndAvatarBig;
