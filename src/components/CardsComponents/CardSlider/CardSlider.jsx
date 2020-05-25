import React from "react";
import ImageGallery from "react-image-gallery";

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

import "./CardSlider.scss";

const images = [
  { original: img1 },
  { original: img2 },
  { original: img3 },
  { original: img4 },
  { original: img5 },
  { original: img6 },
  { original: img7 },
  { original: img8 },
  { original: img9 },
];

const CardSlider = () => {
  return (
    <div className="CardSlider">
      <div className="CardSlider__slide">
        {/* <div>content 1</div>
        <div>content 2</div>
        <div>content 3</div> */}
      </div>
      <ChevronLeft
        aria-label="Previous"
        className="CardSlider__chevron chevron-left"
      />
      <ChevronRight
        aria-label="Next"
        className="CardSlider__chevron chevron-right "
      />
    </div>
  );
};

export default CardSlider;
