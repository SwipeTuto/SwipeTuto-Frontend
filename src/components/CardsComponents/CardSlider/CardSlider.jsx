// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedCardSlides, selectClickedCard } from "../../../redux/filter/filter-selectors";
import { selectFullscreen, selectTheme } from "../../../redux/layout/layout-selectors";
import { closeFullscreen } from "../../../redux/layout/layout-actions";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevron-forward.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import Glide from "@glidejs/glide";

import "./CardSlider.scss";

const CardSlider = () => {
  const clickedCardSlides = useSelector(selectClickedCardSlides); //array
  const [localSlides, setLocalSlides] = useState();
  const clickedCard = useSelector(selectClickedCard);
  const isFullScreen = useSelector(selectFullscreen);
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    setLocalSlides(clickedCardSlides);
  }, [clickedCard, clickedCardSlides]);

  const glide = new Glide(".glide", {
    perView: 1,
    keyboard: true,
    perTouch: 1,
    animationDuration: 200,
    rewind: false,
  });

  useEffect(() => {
    if (localSlides) {
      glide.mount();
    }
  }, [glide, localSlides, isFullScreen]);

  return (
    <div className={`CardSlider ${isFullScreen ? "CardSlider--fullscreen" : ""}`}>
      <div className={`CardSlider__close CardSlider__close--${isFullScreen ? "active" : "hide"}`}>
        <CloseLogo onClick={() => dispatch(closeFullscreen())} />
      </div>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {localSlides !== ["http://localhost:8000null"] ? (
              localSlides &&
              localSlides.map((slide, index) => (
                <li key={index} className="glide__slide">
                  <img src={slide} alt="slide element" />
                </li>
              ))
            ) : (
              <li className="glide__slide">Erreur de chargement des images.</li>
            )}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button className={`glide__arrow glide__arrow--left ${currentTheme}-theme`} data-glide-dir="<">
            <ChevronLeft className="CardSlider__nav" />
          </button>
          <button className={`glide__arrow glide__arrow--right ${currentTheme}-theme`} data-glide-dir=">">
            <ChevronRight className="CardSlider__nav" />
          </button>
        </div>
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {localSlides !== ["http://localhost:8000null"]
            ? localSlides && localSlides.map((slide, index) => <button key={index} className="glide__bullet" data-glide-dir={`=${index}`}></button>)
            : null}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
