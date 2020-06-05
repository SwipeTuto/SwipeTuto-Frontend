// Présent dans App.js

import React from "react";
import { Link } from "react-router-dom";

import "./NavLeft.scss";

const NavLeft = () => {
  return (
    <div className="NavLeft">
      <p className="NavLeft__title">Collections</p>
      <div className="NavLeft__links">
        <Link className="NavLeft__link" to="HTML">
          HTML
        </Link>
        <Link className="NavLeft__link" to="CSS">
          CSS
        </Link>
        <Link className="NavLeft__link" to="JAVASCRIPT">
          JAVASCRIPT
        </Link>
        <Link className="NavLeft__link" to="DJANGO">
          DJANGO
        </Link>
        <Link className="NavLeft__link" to="AUTRE">
          AUTRE
        </Link>
      </div>
      <p className="NavLeft__footer">&copy; MemoCode 2020</p>
    </div>
  );
};

export default NavLeft;
