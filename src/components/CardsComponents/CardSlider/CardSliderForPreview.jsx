// import React, { useState } from "react";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevrons/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevrons/chevron-forward.svg";

import "./CardSliderForPreview.scss";

const CardSliderForPreview = ({ cardSlides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    let slidesLength = cardSlides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    let slidesLength = cardSlides.length - 1;
    if (index === slidesLength) {
      index = -1;
    }
    ++index;
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="cardSliderPreview cardSliderPreview--preview">
      <ul className="cardSliderPreview__slides">
        {cardSlides &&
          cardSlides.map((slide, index) => (
            <img
              className={
                index === activeIndex
                  ? "cardSliderPreview__slide cardSliderPreview__slide--active"
                  : "cardSliderPreview__slide"
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
      <ChevronLeft
        aria-label="Previous"
        className="cardSliderPreview__chevron--preview chevron-left"
        onClick={(e) => goToPrevSlide(e)}
      />
      <ChevronRight
        aria-label="Next"
        className="cardSliderPreview__chevron--preview chevron-right"
        onClick={(e) => goToNextSlide(e)}
      />

      <ul className="cardSliderPreview__indicators--preview">
        {cardSlides &&
          cardSlides.map((slide, index) => (
            <li
              key={index}
              index={index}
              // activeIndex={activeIndex}
              // isactive={activeIndex === index}
              onClick={(e) => goToSlide(index)}
            >
              <a
                className={
                  index == activeIndex
                    ? "cardSliderPreview__indicator--preview cardSliderPreview__indicator--preview--active"
                    : "cardSliderPreview__indicator--preview"
                }
                onClick={(e) => goToSlide(index)}
                href="#"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CardSliderForPreview;
