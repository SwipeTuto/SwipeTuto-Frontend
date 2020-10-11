// Slider pour la CardFullPopup et aussi pour le mode plein écran

import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectClickedCardSlides,
  selectClickedCard,
} from "../../../redux/filter/filter-selectors";
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
  const [localSlides, setLocalSlides] = useState();
  const clickedCard = useSelector(selectClickedCard);
  const isFullScreen = useSelector(selectFullscreen);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const firstSlideEl = document.querySelector(".CardSliderLarge__slide");

  useEffect(() => {
    const slideForWidth =
      document.querySelector(".CardSliderLarge__slide") &&
      document.querySelector(".CardSliderLarge__slide").clientWidth;
    setImageWidth(slideForWidth);
  }, [firstSlideEl]);

  useEffect(() => {
    setActiveIndex(0);
    setLocalSlides(clickedCardSlides);
    document.querySelector(".CardSliderLarge__slides-container").scrollTo(0, 0);
  }, [clickedCard, clickedCardSlides]);

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
          {localSlides !== ["http://localhost:8000null"] ? (
            localSlides &&
            localSlides.map((slide, index) => (
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
          ) : (
            <div
              className="CardSliderLarge__slide CardSliderLarge__slide--active"
              key={1}
              index={1}
              slide={1}
              alt="slide element"
              onContextMenu={(e) => e.preventDefault()}
            >
              Erreur de chargement des images.
            </div>
          )}
          {/* POUR LES TESTS : */}
          {/* {fakeArray.map((source, index) => (
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
        </div>

        {/* Chevron right */}
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

      {/* bullet Indicators navigation */}
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
