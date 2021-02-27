import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectButtonLoaded } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction, toggleFollowByUserIDAction } from "../../../redux/user/user-actions";
import { selectCurrentUserFollowers, selectCurrentUserId } from "../../../redux/user/user-selectors";
import ButtonLoading from "../../Loading/ButtonLoading";
import CustomButton from "../CustomButton/CustomButton";

import "./FollowButton.scss";

const FollowButton = ({ userIDtoFollow }) => {
  const dispatch = useDispatch();
  const buttonLoaded = useSelector(selectButtonLoaded);
  const followers = useSelector(selectCurrentUserFollowers);
  const handleFollowUser = () => {
    dispatch(toggleFollowByUserIDAction(userIDtoFollow));
  };
  const currentUserID = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(getUserFollowersListAction(currentUserID));
  }, [currentUserID, dispatch]);

  return (
    <CustomButton color="dark" onClick={() => handleFollowUser()}>
      {buttonLoaded ? "S'abonner" : <ButtonLoading />}
    </CustomButton>
  );
};

export default FollowButton;
