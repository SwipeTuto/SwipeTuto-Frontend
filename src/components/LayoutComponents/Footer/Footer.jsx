import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDarkMode } from "../../../hooks/useDarkMode";

import { ReactComponent as LogoFacebook } from "../../../assets/images/logo-facebook.svg";
import { ReactComponent as LogoTwitter } from "../../../assets/images/logo-twitter.svg";
import { ReactComponent as LogoGithub } from "../../../assets/images/logo-github.svg";
import { ReactComponent as LogoInstagram } from "../../../assets/images/logo-instagram.svg";

import "./Footer.scss";
import ToggleButton from "../ToggleTheme/ToggleTheme";

const Footer = ({ location }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [theme, setTheme] = useDarkMode();
  const [hide, setHide] = useState(false);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (location.pathname === "/search") {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  return (
    <div className={`Footer ${hide ? "hide" : ""}`}>
      <h2 className="title title-2">SWIPETUTO</h2>
      <div className="Footer__links">
        <div className="Footer__links--group">
          <Link to="/">Accueil</Link>
          <Link to="/search">Cartes</Link>
        </div>
        <div className="Footer__links--group">
          <Link to="/infos">A propos</Link>
          <Link to="/help">Aide</Link>
          <Link to="/contact">Contact</Link>
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
        SWIPETUTO - &copy; SWIPETUTO {currentYear}
        <ToggleButton toggleTheme={toggleTheme} theme={theme} />
      </div>
    </div>
  );
};

export default withRouter(Footer);
