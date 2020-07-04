// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedCardSlides } from "../../../redux/cards/cards-selectors";
import { selectFullscreen } from "../../../redux/layout/layout-selectors";
import { closeFullscreen } from "../../../redux/layout/layout-actions";

import { ReactComponent as ChevronLeftWhite } from "../../../assets/images/chevrons/chevron-back-white.svg";

import { ReactComponent as ChevronRightWhite } from "../../../assets/images/chevrons/chevron-forward-white.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./CardSliderFullscreen.scss";

const CardSliderFullscreen = () => {
  const clickedCardSlides = useSelector(selectClickedCardSlides); //array
  const isFullScreen = useSelector(selectFullscreen);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    document.querySelector(".CardSliderLargeFullscreen").requestFullscreen();
    setActiveIndex(0);
    const slideForWidth = window.screen.height;
    setImageWidth(slideForWidth);
  }, [isFullScreen]);

  const goToPrevSlide = (e) => {
    document
      .querySelector(".CardSliderLargeFullscreen__slides-container")
      .scrollBy(-imageWidth, 0);
  };

  const goToNextSlide = (e) => {
    document
      .querySelector(".CardSliderLargeFullscreen__slides-container")
      .scrollBy(imageWidth, 0);
  };

  const handleScrollLevel = (e) => {
    const currentScrollLevel = document.querySelector(
      ".CardSliderLargeFullscreen__slides-container"
    ).scrollLeft;
    setActiveIndex(Math.floor(currentScrollLevel / (imageWidth - 10)));
  };

  return (
    <div className="CardSliderLargeFullscreen">
      <div
        className="CardSliderLargeFullscreen__fullscreen-close"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(closeFullscreen());
        }}
      >
        <CloseLogo />
      </div>
      {activeIndex === 0 ? (
        ""
      ) : (
        <ChevronLeftWhite
          aria-label="Previous"
          className="CardSliderLargeFullscreen__chevron--fullpage chevron-left-white"
          onClick={(e) => goToPrevSlide(e)}
        />
      )}
      {activeIndex === clickedCardSlides.length - 1 ? (
        ""
      ) : (
        <ChevronRightWhite
          aria-label="Next"
          className="CardSliderLargeFullscreen__chevron--fullpage chevron-right-white"
          onClick={(e) => goToNextSlide(e)}
        />
      )}

      <div className="CardSliderLargeFullscreen__indicators--fullscreen">
        {`${activeIndex + 1} / ${
          clickedCardSlides && clickedCardSlides.length
        }`}
      </div>

      <div
        className="CardSliderLargeFullscreen__slides-container"
        onScroll={(e) => handleScrollLevel(e)}
      >
        {clickedCardSlides &&
          clickedCardSlides.map((slide, index) => (
            <img
              className={
                index === activeIndex
                  ? "CardSliderLargeFullscreen__slide CardSliderLargeFullscreen__slide--active"
                  : "CardSliderLargeFullscreen__slide"
              }
              key={index}
              index={index}
              src={slide}
              slide={slide}
              alt="slide element"
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
      </div>
    </div>
  );
};

export default CardSliderFullscreen;
