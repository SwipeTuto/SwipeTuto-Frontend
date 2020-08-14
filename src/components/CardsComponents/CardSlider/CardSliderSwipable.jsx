// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedCardSlides } from "../../../redux/filter/filter-selectors";
import { selectFullscreen } from "../../../redux/layout/layout-selectors";
import { closeFullscreen } from "../../../redux/layout/layout-actions";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronLeftWhite } from "../../../assets/images/chevrons/chevron-back-white.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";
import { ReactComponent as ChevronRightWhite } from "../../../assets/images/chevrons/chevron-forward-white.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./CardSliderSwipable.scss";

const CardSliderSwipebale = () => {
  const clickedCardSlides = useSelector(selectClickedCardSlides); //array
  const isFullScreen = useSelector(selectFullscreen);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    const slideForWidth = document.querySelector(".CardSliderLarge__slide")
      .clientWidth;
    setImageWidth(slideForWidth);
  }, [clickedCardSlides]);

  const goToPrevSlide = (e) => {
    document
      .querySelector(".CardSliderLarge__slides-container")
      .scrollBy(-imageWidth, 0);
  };

  const goToNextSlide = (e) => {
    document
      .querySelector(".CardSliderLarge__slides-container")
      .scrollBy(imageWidth, 0);
  };

  const goToSlide = (index) => {
    document
      .querySelector(".CardSliderLarge__slides-container")
      .scrollTo(imageWidth * index, 0);
  };

  const handleScrollLevel = (e) => {
    const currentScrollLevel = document.querySelector(
      ".CardSliderLarge__slides-container"
    ).scrollLeft;
    setActiveIndex(Math.floor(currentScrollLevel / (imageWidth - 10)));
  };

  const getCSSobject = (boolean) => {
    if (boolean) {
      return {
        visibility: "hidden",
      };
    } else {
      return {};
    }
  };

  const fakeArray = [
    "https://fakeimg.pl/500x500/?text=Hello",
    "https://fakeimg.pl/500x500/?text=Card2",
    "https://fakeimg.pl/500x500/?text=HEyyyy",
    "https://fakeimg.pl/500x500/?text=Salut!",
    "https://fakeimg.pl/500x500/?text=Aurevoir!",
    "https://fakeimg.pl/500x500/?text=Youhouu",
  ];

  return (
    <div className="CardSliderLarge">
      <div className="CardSliderLarge__wrapper">
        {/* Chevron left */}
        {isFullScreen ? (
          <Fragment>
            <div
              className="CardSliderLarge__fullscreen-close"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(closeFullscreen());
              }}
            >
              <CloseLogo />
            </div>

            <ChevronLeftWhite
              aria-label="Previous"
              className="CardSliderLarge__chevron--fullpage chevron-left-white"
              onClick={(e) => goToPrevSlide(e)}
              style={getCSSobject(activeIndex === 0)}
            />
          </Fragment>
        ) : (
          <ChevronLeft
            aria-label="Previous"
            className="CardSliderLarge__chevron--fullpage chevron-left"
            onClick={(e) => goToPrevSlide(e)}
            style={getCSSobject(activeIndex === 0)}
          />
        )}

        {/* SLIDER AU CENTRE */}
        <div
          className={`CardSliderLarge__slides-container ${
            isFullScreen ? "active" : ""
          }`}
          onScroll={(e) => handleScrollLevel(e)}
        >
          {/* {clickedCardSlides !== ["http://localhost:8000null"]
            ? clickedCardSlides.map((slide, index) => (
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
                  onContextMenu={(e) => e.preventDefault()}
                />
              ))
            : fakeArray.map((source, index) => (
                <img
                  className={
                    index === activeIndex
                      ? "CardSliderLarge__slide CardSliderLarge__slide--active"
                      : "CardSliderLarge__slide"
                  }
                  key={index}
                  index={index}
                  src={source}
                  slide={source}
                  alt="slide element"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ))} */}
          {fakeArray.map((source, index) => (
            <img
              className={
                index === activeIndex
                  ? "CardSliderLarge__slide CardSliderLarge__slide--active"
                  : "CardSliderLarge__slide"
              }
              key={index}
              index={index}
              src={source}
              slide={source}
              alt="slide element"
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
        </div>
        {/* Chevron left */}
        {isFullScreen ? (
          <Fragment>
            <ChevronRightWhite
              aria-label="Next"
              className="CardSliderLarge__chevron--fullpage chevron-right-white"
              onClick={(e) => goToNextSlide(e)}
              style={getCSSobject(activeIndex === clickedCardSlides.length - 1)}
            />

            <div className="CardSliderLarge__indicators--fullscreen">
              {`${activeIndex + 1} / ${
                clickedCardSlides && clickedCardSlides.length
              }`}
            </div>
          </Fragment>
        ) : (
          <ChevronRight
            aria-label="Next"
            className="CardSliderLarge__chevron--fullpage chevron-right"
            onClick={(e) => goToNextSlide(e)}
            style={getCSSobject(activeIndex === clickedCardSlides.length - 1)}
          />
        )}
      </div>
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
    </div>
  );
};

export default CardSliderSwipebale;
