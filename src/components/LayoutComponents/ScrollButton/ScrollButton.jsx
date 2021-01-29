import React from "react";
import { ReactComponent as GoTopLogo } from "../../../assets/images/arrow-up-circle.svg";
import "./ScrollButton.scss";

const ScrollButton = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    let goTopButton = document.querySelector(".ScrollButton");

    if (goTopButton && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
      goTopButton.style.display = "block";
    } else if (goTopButton) {
      goTopButton.style.display = "none";
    }
  };

  const handleGoTopButton = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div>
      <GoTopLogo className="ScrollButton" onClick={handleGoTopButton} />
    </div>
  );
};

export default ScrollButton;
