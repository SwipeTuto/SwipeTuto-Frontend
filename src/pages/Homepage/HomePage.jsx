// Présent dans App.js dans une Route ("/")

import React from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import CardGridList from "../../components/CardGridList/CardGridList";

import "./HomePage.scss";

const HomePage = props => {
  return (
    <div className="HomePage">
      <HomeHeader />
      <CardGridList />
      <div className="HomePage__section cta-section">
        <p className="HomePage__cta">
          Essayez une recherche par tag en cliquant dessus :
        </p>
        <div className="HomePage__tags">
          <button>#HTML</button>
          <button>#JAVASCRIPT</button>
          <button>#CSS</button>
        </div>
      </div>
      <div className="HomePage__informations">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit minima
          veritatis vel facilis. Laborum debitis fugiat ullam distinctio sequi!
          Ipsum natus corrupti quaerat asperiores itaque, autem officia eveniet
          temporibus. Error?
        </p>
      </div>
    </div>
  );
};

export default HomePage;
