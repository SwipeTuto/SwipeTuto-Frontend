import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      MemoCode - &copy; MemoCode 2020 -{" "}
      <Link to="/conditions">Conditions d'utilisation</Link> -{" "}
      <Link to="/confidentiality">Confidientialité</Link> -{" "}
      <Link to="/cookies">Cookies</Link> - <Link to="/infos">Informations</Link>
    </div>
  );
};

export default Footer;
