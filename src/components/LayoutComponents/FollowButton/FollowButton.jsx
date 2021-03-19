import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectButtonLoaded } from "../../../redux/layout/layout-selectors";
import { getUserFollowersListAction, toggleFollowByUserIDAction } from "../../../redux/user/user-actions";
import { selectClickedUser, selectCurrentUserFollowers, selectCurrentUserFollowings, selectCurrentUserId } from "../../../redux/user/user-selectors";
import ButtonLoading from "../../Loading/ButtonLoading";
import CustomButton from "../CustomButton/CustomButton";

import "./FollowButton.scss";

const FollowButton = ({ adjustFollowers, userIDtoFollow }) => {
  const dispatch = useDispatch();
  const buttonLoaded = useSelector(selectButtonLoaded);
  const followings = useSelector(selectCurrentUserFollowings);
  const [followed, setFollowed] = useState();

  useEffect(() => {
    setFollowed(checkIfFollowed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleFollowUser = () => {
    adjustFollowers(!followed);
    setFollowed((prevState) => !prevState);
    dispatch(toggleFollowByUserIDAction(userIDtoFollow));
  };

  const checkIfFollowed = () => {
    return followings && userIDtoFollow && followings.some((id) => id === userIDtoFollow);
  };

  return (
    <>
      {checkIfFollowed() ? (
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
