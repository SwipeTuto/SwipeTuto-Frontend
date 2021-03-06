import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectButtonLoaded } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction, toggleFollowByUserIDAction } from "../../../redux/user/user-actions";
import { selectClickedUser, selectCurrentUserFollowers, selectCurrentUserId } from "../../../redux/user/user-selectors";
import ButtonLoading from "../../Loading/ButtonLoading";
import CustomButton from "../CustomButton/CustomButton";

import "./FollowButton.scss";

const FollowButton = ({ userIDtoFollow }) => {
  const dispatch = useDispatch();
  const buttonLoaded = useSelector(selectButtonLoaded);
  const followers = useSelector(selectCurrentUserFollowers);
  // const currentUserID = useSelector(selectCurrentUserId);
  const handleToggleFollowUser = () => {
    dispatch(toggleFollowByUserIDAction(userIDtoFollow));
  };

  return (
    <>
      {followers && userIDtoFollow && followers.some((id) => id === userIDtoFollow) ? (
        <CustomButton color="dark" onClick={() => handleToggleFollowUser(userIDtoFollow)}>
          {buttonLoaded ? "Abonné" : <ButtonLoading />}
        </CustomButton>
      ) : (
        <CustomButton onClick={() => handleToggleFollowUser(userIDtoFollow)}>{buttonLoaded ? "S'abonner" : <ButtonLoading />}</CustomButton>
      )}
    </>
  );
};

export default FollowButton;
