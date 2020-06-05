// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedCardSlides } from "../../../redux/cards/cards-selectors";
import { selectFullscreen } from "../../../redux/layout/layout-selectors";
import {
  closeFullscreen,
  showFullscreen,
} from "../../../redux/layout/layout-actions";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronLeftWhite } from "../../../assets/images/chevrons/chevron-back-white.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";
import { ReactComponent as ChevronRightWhite } from "../../../assets/images/chevrons/chevron-forward-white.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/fullscreen.svg";

import "./CardSliderPopup.scss";

const CardSliderPopup = () => {
  const clickedCardSlides = useSelector(selectClickedCardSlides);
  // console.log(clickedCardSlides);
  const isFullScreen = useSelector(selectFullscreen);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [clickedCardSlides]);

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    let slidesLength = clickedCardSlides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    let slidesLength = clickedCardSlides.length - 1;
    if (index === slidesLength) {
      index = -1;
    }
    ++index;
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // changement de slide avec les flèches du clavien
  // document.addEventListener("keydown", (e) => {
  //   console.log(e.keyCode);
  //   switch (e.keyCode) {
  //     case 37:
  //       // goToPrevSlide();
  //       console.log(37);
  //       break;
  //     case 39:
  //       // goToNextSlide();
  //       console.log(39);
  //       break;
  //     default:
  //       return;
  //   }

  // e.stopPropagation();
  // e.preventDefault();
  // if (e.keyCode === 37) {
  //   goToPrevSlide();
  // } else if (e.keyCode === 39) {
  //   goToNextSlide();
  // } else {
  //   return;
  // }
  // });

  return (
    <div className="CardSliderLarge">
      {isFullScreen ? (
        <Fragment>
          <div
            className="CardSliderLarge__fullscreen-close"
            onClick={(e) => {
              e.stopPropagation();
              // dispatch(closeFullscreen());
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
              className="CardSliderLarge__chevron--fullpage chevron-left-white"
              onClick={(e) => goToPrevSlide(e)}
            />
          )}
          {activeIndex === clickedCardSlides.length - 1 ? (
            ""
          ) : (
            <ChevronRightWhite
              aria-label="Next"
              className="CardSliderLarge__chevron--fullpage chevron-right-white"
              onClick={(e) => goToNextSlide(e)}
            />
          )}

          <div className="CardSliderLarge__indicators--fullscreen">
            {`${activeIndex + 1} / ${
              clickedCardSlides && clickedCardSlides.length
            }`}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {activeIndex === 0 ? (
            ""
          ) : (
            <ChevronLeft
              aria-label="Previous"
              className="CardSliderLarge__chevron--fullpage chevron-left"
              onClick={(e) => goToPrevSlide(e)}
            />
          )}
          {activeIndex === clickedCardSlides.length - 1 ? (
            ""
          ) : (
            <ChevronRight
              aria-label="Next"
              className="CardSliderLarge__chevron--fullpage chevron-right"
              onClick={(e) => goToNextSlide(e)}
            />
          )}
        </Fragment>
      )}
      <ul className="CardSliderLarge__slides">
        {clickedCardSlides &&
          clickedCardSlides.map((slide, index) => (
            <img
              className={
                index === activeIndex
                  ? "CardSliderLarge__slide CardSliderLarge__slide--active"
                  : "CardSliderLarge__slide"
              }
              key={index}
              index={index}
              src={slide}
              slide={slide}
              alt="slide element"
            />
          ))}
      </ul>
      {isFullScreen ? null : (
        <ul className="CardSliderLarge__indicators">
          {clickedCardSlides &&
            clickedCardSlides.map((slide, index) => (
              <li key={index} index={index} onClick={(e) => goToSlide(index)}>
                <div
                  className={
                    index === activeIndex
                      ? "CardSliderLarge__indicator CardSliderLarge__indicator--active"
                      : "CardSliderLarge__indicator"
                  }
                  onClick={(e) => goToSlide(index)}
                  href="#"
                />
              </li>
            ))}
        </ul>
      )}
      <FullscreenLogo
        className="CardSliderLarge__fullscreen-logo"
        onClick={() => dispatch(showFullscreen())}
      />
    </div>
  );
};

export default CardSliderPopup;
