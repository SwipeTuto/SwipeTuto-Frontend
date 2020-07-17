import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import { ReactComponent as LogoInstagram } from "../../../assets/images/logo-instagram.svg";

import "./Footer.scss";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="Footer">
      <h2 className="title title-2">SwipeTuto</h2>
      <div className="Footer__links">
        <div className="Footer__links--group">
          <Link to="/">Accueil</Link>
          <Link to="/ressources">Ressources</Link>
          <Link to="/search">Cartes</Link>
        </div>
        <div className="Footer__links--group">
          <Link to="/infos">A propos</Link>
          <Link to="/help">Aide</Link>
          <Link to="/contact-us">Contact</Link>
        </div>
        <div className="Footer__links--group">
          <Link to="/confidentiality">Confidientialité</Link>
          <Link to="/conditions">Conditions d'utilisation</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
      <div className="Footer__social">
        <Link to="">
          <LogoFacebook />
        </Link>
        <Link to="">
          <LogoTwitter />
        </Link>
        <Link to="">
          <LogoInstagram />
        </Link>
        <Link to="">
          <LogoGithub />
        </Link>
      </div>
      <div className="Footer__credits">
        SwipeTuto - &copy; SwipeTuto {currentYear}
      </div>
    </div>
  );
};

export default Footer;
