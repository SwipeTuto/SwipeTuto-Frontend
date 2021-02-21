import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationPopup } from "../../../redux/layout/layout-actions";
import { selectNotificationPopupOpen } from "../../../redux/layout/layout-selectors";

import "./NotificationPopup.scss";

const NotificationPopup = ({ notification }) => {
  // type = "error", "success" or "info"
  const notificationPopup = useSelector(selectNotificationPopupOpen);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationPopup && notificationPopup.open) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        dispatch(closeNotificationPopup());
      }, 4000);
    }
  }, [dispatch, notificationPopup]);

  return (
    <div className={`NotificationPopup NotificationPopup-${notificationPopup?.type} ${isActive ? "active" : ""}`}>
      {notificationPopup && notificationPopup.notification}
    </div>
  );
};

export default NotificationPopup;
