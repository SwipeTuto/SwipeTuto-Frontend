import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ReactComponent as MenuLogo } from "../../../assets/images/ellipsis-vertical.svg";

import "./VerticalMenu.scss";

const VerticalMenu = ({ children }) => {
  // modèle items : [{action onClick, value}, {action : () => openTab(), value : Menu}, ...]
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(children);
  return (
    <div className="VerticalMenu">
      <div
        className="VerticalMenu__logo"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MenuLogo className="VerticalMenu__logo--logo" />
      </div>
      {menuOpen && (
        <div className="VerticalMenu__menu">
          {children &&
            children.map((child, index) => {
              return (
                <span key={index} onClick={() => setMenuOpen(!menuOpen)}>
                  {child}
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default VerticalMenu;
