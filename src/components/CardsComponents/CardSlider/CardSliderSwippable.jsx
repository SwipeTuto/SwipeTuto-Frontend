import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Swiper from "swiper";
import Slider from "react-slick";

import { selectClickedCardSlides } from "../../../redux/cards/cards-selectors";

// import "./swiper.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./CardSliderSwippable.scss";

const CardSliderSwippable = () => {
  // const clickedCardSlides = useSelector(selectClickedCardSlides);
  // const [slides, setSlides] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // useEffect(() => {
  //   let slidesToMap = clickedCardSlides ? clickedCardSlides : null;
  //   if (slidesToMap) {
  //     setSlides(
  //       slidesToMap.map((slide) => (
  //         <div className="slide" key={slide}>
  //           <img src={slide} alt="slide item" />
  //         </div>
  //       ))
  //     );
  //   }
  // }, [clickedCardSlides]);

  return (
    <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
};

export default CardSliderSwippable;

//   const [swiper, setSwiper] = useState();

//   useEffect(() => {
//     setSwiper(
//       new Swiper(".swiper-container", {
//         // If we need pagination
//         pagination: {
//           el: ".swiper-pagination",
//         },

//         navigation: {
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         },

//         observer: true,
//         observeParents: true,
//         observeSlideChildren: true,
//       })
//     );
//   }, []);

//   // const mySwiper = new Swiper(".swiper-container", {
//   //   // If we need pagination
//   //   pagination: {
//   //     el: ".swiper-pagination",
//   //   },
//   // });

//   return (
//     <div className="swiper-container">
//       <div className="swiper-wrapper">{slides ? slides : ""}</div>
//       <div className="swiper-pagination"></div>
//       <div className="swiper-button-prev"></div>
//       <div className="swiper-button-next"></div>
//     </div>
//   );
// };
