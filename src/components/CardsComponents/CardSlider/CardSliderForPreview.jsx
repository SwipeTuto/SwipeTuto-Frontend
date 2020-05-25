import React, { useState } from "react";
// import ImageGallery from "react-image-gallery";

import { ReactComponent as ChevronLeft } from "../../../assets/images/chevron-back.svg";
import { ReactComponent as ChevronRight } from "../../../assets/images/chevron-forward.svg";
import img1 from "../../../assets/images/slide-test/img1.png";
import img2 from "../../../assets/images/slide-test/img2.png";
import img3 from "../../../assets/images/slide-test/img3.png";
import img4 from "../../../assets/images/slide-test/img4.png";
import img5 from "../../../assets/images/slide-test/img5.png";
import img6 from "../../../assets/images/slide-test/img6.png";
import img7 from "../../../assets/images/slide-test/img7.png";
import img8 from "../../../assets/images/slide-test/img8.png";
import img9 from "../../../assets/images/slide-test/img9.png";

import "./CardSliderForPreview.scss";

// const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const CardSliderForPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div className="CardSlider CardSlider--preview">
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
        className="CardSlider__chevron--preview chevron-left"
        onClick={(e) => goToPrevSlide(e)}
      />
      <ChevronRight
        aria-label="Next"
        className="CardSlider__chevron--preview chevron-right"
        onClick={(e) => goToNextSlide(e)}
      />

      <ul className="CardSlider__indicators--preview">
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
                  ? "CardSlider__indicator--preview CardSlider__indicator--preview--active"
                  : "CardSlider__indicator--preview"
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
