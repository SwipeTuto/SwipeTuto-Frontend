import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationPopup } from "../../../redux/layout/layout-actions";
import { selectNotificationPopupOpen } from "../../../redux/layout/layout-selectors";

import "./NotificationPopup.scss";

const NotificationPopup = ({ notification }) => {
  const notificationPopup = useSelector(selectNotificationPopupOpen);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationPopup && notificationPopup.open) {
      console.log("open");
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        dispatch(closeNotificationPopup());
        console.log("close");
      }, 3000);
    }
  }, [dispatch, notificationPopup]);

  return (
    <div className={`NotificationPopup ${isActive ? "active" : ""}`}>
      {notificationPopup && notificationPopup.notification}
    </div>
  );
};

export default NotificationPopup;
