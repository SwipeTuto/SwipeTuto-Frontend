import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as MenuLogo } from "../../../assets/images/ellipsis-vertical.svg";
import { ReactComponent as ShareLogo } from "../../../assets/images/share-social.svg";
import { openConnexionPopup } from "../../../redux/layout/layout-actions";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import { selectCurrentUser } from "../../../redux/user/user-selectors";

import "./VerticalMenu.scss";

const VerticalMenu = ({ addclass, type, children }) => {
  // child model :
  // <p className="VerticalMenu__menu--item"></p>
  const [menuOpen, setMenuOpen] = useState(false);
  const currentTheme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const modal = useRef();

  const checkClickInside = (event) => {
    const isClickInside = modal.current && modal.current.contains(event.target);

    if (!isClickInside) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", checkClickInside);
    return () => {
      document.removeEventListener("click", checkClickInside);
    };
  });

  const checkIfConnected = () => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      setMenuOpen(!menuOpen);
    }
  };
  return (
    <div
      ref={modal}
      className={`VerticalMenu ${addclass && addclass}`}
      onClick={(e) => {
        e.stopPropagation();
        checkIfConnected();
      }}
    >
      <div className={`VerticalMenu__logo ${currentTheme}-theme`}>
        {type && type === "share" ? <ShareLogo className="VerticalMenu__logo--logo" /> : <MenuLogo className="VerticalMenu__logo--logo" />}
      </div>
      {menuOpen && (
        <div className={`VerticalMenu__menu ${currentTheme}-theme-l`}>
          {children && children.length ? (
            children.map((child, index) => {
              return (
                <span className="VerticalMenu__menu--item" key={index} onClick={() => setMenuOpen(!menuOpen)}>
                  {child}
                </span>
              );
            })
          ) : children ? (
            <span className="VerticalMenu__menu--item" onClick={() => setMenuOpen(!menuOpen)}>
              {children}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
