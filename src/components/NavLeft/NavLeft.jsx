import React from "react";
import { Link } from "react-router-dom";

import "./NavLeft.scss";

const NavLeft = () => {
  return (
    <div className="NavLeft">
      <Link className="NavLeft__link" to="/">
        Item1
      </Link>
      <Link className="NavLeft__link" to="/">
        Item2
      </Link>
      <Link className="NavLeft__link" to="/">
        Item3
      </Link>
    </div>
  );
};

export default NavLeft;
