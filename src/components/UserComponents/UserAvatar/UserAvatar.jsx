import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { getInitials } from "../../../helper/index";

import "./UserAvatar.scss";
import { CardsActionTypes } from "../../../redux/cards/cards-types";

const UserAvatar = ({ userImage, userFirstName, userLastName }) => {
  // const currentUser = useSelector(selectCurrentUser);
  // console.log({ userObject });
  // const [userObj, setUserObj] = useState();
  // const [test, setTest] = useState(true);

  // useEffect(() => {
  //   if (test) {
  //     setTest(false);
  //     setUserObj(userObject);
  //     console.log(userObj);
  //   }
  //   console.log(test);
  // }, [test]);

  // const currentUser = useSelector(selectCurrentUser);
  // const authorUser = useSelector((state) => state.cards.clickedCards);

  // let actualUser;
  // switch (userObject) {
  //   case "current":
  //     actualUser = currentUser;
  //     break;
  //   case "author":
  //     actualUser = authorUser;
  //     break;
  //   default:
  //     actualUser = "me";
  // }

  console.log(userImage, userFirstName, userLastName);

  return (
    <div className="user_avatar">
      {userImage ? (
        <img className="user_avatar--image" src={userImage} alt="user" />
      ) : userFirstName && userLastName ? (
        getInitials(userFirstName, userLastName)
      ) : (
        "S"
      )}
    </div>
  );
};

export default UserAvatar;
