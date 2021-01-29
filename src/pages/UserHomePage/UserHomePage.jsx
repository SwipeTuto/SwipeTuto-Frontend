import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCardPrefUserAction } from "../../redux/filter/filter-actions";
import "./UserHomePage.scss";

const UserHomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardPrefUserAction());
  }, [dispatch]);

  return <div className="UserHomePage">test user homepage</div>;
};

export default UserHomePage;
