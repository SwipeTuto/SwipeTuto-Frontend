// Présent dans App.js dans une Route ("/")

import React from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";

const HomePage = () => {
  return (
    <div className="HomePage">
      <HomeHeader />
      This is homepage !
    </div>
  );
};

export default HomePage;
