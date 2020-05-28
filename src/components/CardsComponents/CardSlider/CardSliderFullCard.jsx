// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { Fragment, useState, useEffect } from "react";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronLeftWhite } from "../../../assets/images/chevron-back-white.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevron-forward.svg";
import { ReactComponent as ChevronRightWhite } from "../../../assets/images/chevron-forward-white.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/fullscreen.svg";

import "./CardSliderFullCard.scss";

const CardSlider = ({ clickedcard }) => {
  console.log(clickedcard);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    // let { slides } = props;
    let slidesLength = clickedcard.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    // let { slides } = props;
    let slidesLength = clickedcard.length - 1;
    if (index === slidesLength) {
      index = -1;
    }
    ++index;
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
    document.querySelector(".CardSliderLarge").requestFullscreen();
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    document.exitFullscreen();
  };

  return (
    <div className="CardSliderLarge">
      {isFullScreen ? (
        <Fragment>
          <div
            className="CardSliderLarge__fullscreen-close"
            onClick={closeFullScreen}
          >
            <CloseLogo />
          </div>

          <ChevronLeftWhite
            aria-label="Previous"
            className="CardSliderLarge__chevron--fullpage chevron-left-white"
            onClick={(e) => goToPrevSlide(e)}
          />
          <ChevronRightWhite
            aria-label="Next"
            className="CardSliderLarge__chevron--fullpage chevron-right-white"
            onClick={(e) => goToNextSlide(e)}
          />

          <div className="CardSliderLarge__indicators--fullscreen">
            {`${activeIndex + 1} / ${clickedcard && clickedcard.length}`}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <ChevronLeft
            aria-label="Previous"
            className="CardSliderLarge__chevron--fullpage chevron-left"
            onClick={(e) => goToPrevSlide(e)}
          />
          <ChevronRight
            aria-label="Next"
            className="CardSliderLarge__chevron--fullpage chevron-right"
            onClick={(e) => goToNextSlide(e)}
          />

          <ul className="CardSliderLarge__indicators">
            {clickedcard &&
              clickedcard.map((slide, index) => (
                <li
                  key={index}
                  index={index}
                  activeIndex={activeIndex}
                  isActive={activeIndex === index}
                  onClick={(e) => goToSlide(index)}
                >
                  <a
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
        </Fragment>
      )}
      <ul className="CardSliderLarge__slides">
        {clickedcard &&
          clickedcard.map((slide, index) => (
            <img
              className={
                index === activeIndex
                  ? "CardSliderLarge__slide CardSliderLarge__slide--active"
                  : "CardSliderLarge__slide"
              }
              key={index}
              index={index}
              activeIndex={activeIndex}
              src={slide}
              slide={slide}
              alt="slide element"
            />
          ))}
      </ul>

      {/* <ChevronLeft
        aria-label="Previous"
        className="CardSliderLarge__chevron--fullpage chevron-left"
        onClick={(e) => goToPrevSlide(e)}
      />
      <ChevronRight
        aria-label="Next"
        className="CardSliderLarge__chevron--fullpage chevron-right"
        onClick={(e) => goToNextSlide(e)}
      /> */}

      {/* {isFullScreen ? (
        <>
        <ChevronLeft
            aria-label="Previous"
            className="CardSliderLarge__chevron--fullpage chevron-left"
            onClick={(e) => goToPrevSlide(e)}
          />
          <ChevronRight
            aria-label="Next"
            className="CardSliderLarge__chevron--fullpage chevron-right"
            onClick={(e) => goToNextSlide(e)}
          />
        </>
      ) : (
        <>
          <ChevronLeftWhite
            aria-label="Previous"
            className="CardSliderLarge__chevron--fullpage chevron-left-white"
            onClick={(e) => goToPrevSlide(e)}
          />
          <ChevronRightWhite
            aria-label="Next"
            className="CardSliderLarge__chevron--fullpage chevron-right-white"
            onClick={(e) => goToNextSlide(e)}
          />
        </>
      )} */}

      <FullscreenLogo
        className="CardSliderLarge__fullscreen-logo"
        onClick={handleFullScreen}
      />
      {/* {isFullScreen ? (
        <div className="CardSliderLarge__indicators--fullscreen">
          {`${activeIndex + 1} / ${totalSlides}`}
        </div>
      ) : (
        <ul className="CardSliderLarge__indicators">
          {slides.map((slide, index) => (
            <li
              key={index}
              index={index}
              activeIndex={activeIndex}
              isActive={activeIndex === index}
              onClick={(e) => goToSlide(index)}
            >
              <a
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
      )} */}
    </div>
  );
};

export default CardSlider;
