import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { ReactComponent as AlertLogo } from "../../../assets/images/flame.svg";
import { ReactComponent as SuggestionLogo } from "../../../assets/images/megaphone.svg";
import { ReactComponent as NotificationLogo } from "../../../assets/images/notifications.svg";

import "./NotificationHomeBox.scss";

const NotificationHomeBox = ({ notification }) => {
  const { type, message } = notification;
  const currentTheme = useSelector(selectTheme);

  return (
    <div className={`NotificationHomeBox ${currentTheme}-theme-l`}>
      {type && type === "alert" ? <AlertLogo /> : type && type === "suggestion" ? <SuggestionLogo /> : <NotificationLogo />}
      {message}
    </div>
  );
};

export default NotificationHomeBox;
