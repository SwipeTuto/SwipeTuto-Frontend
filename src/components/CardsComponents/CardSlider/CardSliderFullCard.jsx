import React, { useState, useEffect } from "react";
// import ImageGallery from "react-image-gallery";
import CardSliderForPreview from "./CardSliderForPreview";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevron-forward.svg";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";
import { ReactComponent as FullscreenLogo } from "../../../assets/images/fullscreen.svg";
import img1 from "../../../assets/images/slide-test/img1.png";
import img2 from "../../../assets/images/slide-test/img2.png";
import img3 from "../../../assets/images/slide-test/img3.png";
import img4 from "../../../assets/images/slide-test/img4.png";
import img5 from "../../../assets/images/slide-test/img5.png";
import img6 from "../../../assets/images/slide-test/img6.png";
import img7 from "../../../assets/images/slide-test/img7.png";
import img8 from "../../../assets/images/slide-test/img8.png";
import img9 from "../../../assets/images/slide-test/img9.png";

import "./CardSliderFullCard.scss";

// const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const totalSlides = slides.length;

const CardSlider = ({ forPreview }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const goToPrevSlide = (e) => {
    let index = activeIndex;
    // let { slides } = props;
    let slidesLength = slides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    setActiveIndex(index);
  };

  const goToNextSlide = (e) => {
    let index = activeIndex;
    // let { slides } = props;
    let slidesLength = slides.length - 1;
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
    document.querySelector(".CardSlider").requestFullscreen();
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    document.exitFullscreen();
  };

  return (
    <div className="CardSlider">
      {isFullScreen ? (
        <div className="CardSlider__fullscreen-close" onClick={closeFullScreen}>
          <CloseLogo />
        </div>
      ) : (
        ""
      )}
      <ul className="CardSlider__slides">
        {slides.map((slide, index) => (
          <img
            className={
              index === activeIndex
                ? "CardSlider__slide CardSlider__slide--active"
                : "CardSlider__slide"
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
        className={`CardSlider__chevron--fullpage chevron-left ${
          isFullScreen ? "chevron__fullpage" : ""
        }`}
        onClick={(e) => goToPrevSlide(e)}
      />
      <ChevronRight
        aria-label="Next"
        className={`CardSlider__chevron--fullpage chevron-right ${
          isFullScreen ? "chevron__fullpage" : ""
        }`}
        onClick={(e) => goToNextSlide(e)}
      />
      <FullscreenLogo
        className="CardSlider__fullscreen-logo"
        onClick={handleFullScreen}
      />
      {isFullScreen ? (
        <div className="CardSlider__indicators--fullscreen">
          {`${activeIndex + 1} / ${totalSlides}`}
        </div>
      ) : (
        <ul className="CardSlider__indicators">
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
                  index == activeIndex
                    ? "CardSlider__indicator CardSlider__indicator--active"
                    : "CardSlider__indicator"
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

export default CardSlider;
