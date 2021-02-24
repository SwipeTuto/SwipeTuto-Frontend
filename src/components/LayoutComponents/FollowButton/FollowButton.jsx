import React from "react";
import { useSelector } from "react-redux";
import { selectButtonLoaded } from "../../../redux/layout/layout-selectors";
import { selectCurrentUserFollowers } from "../../../redux/user/user-selectors";
import ButtonLoading from "../../Loading/ButtonLoading";
import CustomButton from "../CustomButton/CustomButton";

import "./FollowButton.scss";

const FollowButton = () => {
  const buttonLoaded = useSelector(selectButtonLoaded);
  const followers = useSelector(selectCurrentUserFollowers);
  const handleFollowUser = () => {};

  return (
    <CustomButton color="dark" onClick={() => handleFollowUser()}>
      {buttonLoaded ? "S'abonner" : <ButtonLoading />}
    </CustomButton>
  );
};

export default FollowButton;
