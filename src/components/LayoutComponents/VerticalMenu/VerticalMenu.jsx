import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as MenuLogo } from "../../../assets/images/ellipsis-vertical.svg";
import { ReactComponent as ShareLogo } from "../../../assets/images/share-social.svg";
import { openConnexionPopup } from "../../../redux/layout/layout-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

import "./VerticalMenu.scss";

const VerticalMenu = ({ className, type, children }) => {
  // child model :
  // <p className="VerticalMenu__menu--item"></p>
  const [menuOpen, setMenuOpen] = useState(false);
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const checkIfConnected = () => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      setMenuOpen(!menuOpen);
    }
  };
  return (
    <div
      className={`VerticalMenu ${className && className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="VerticalMenu__logo"
        onClick={(e) => {
          e.stopPropagation();
          checkIfConnected();
        }}
      >
        {type && type === "share" ? (
          <ShareLogo className="VerticalMenu__logo--logo" />
        ) : (
          <MenuLogo className="VerticalMenu__logo--logo" />
        )}
      </div>
      {menuOpen && (
        <div className={`VerticalMenu__menu ${currentTheme}-theme`}>
          {children && children.length ? (
            children.map((child, index) => {
              return (
                <span
                  className="VerticalMenu__menu--item"
                  key={index}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {child}
                </span>
              );
            })
          ) : children ? (
            <span
              className="VerticalMenu__menu--item"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {children}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
