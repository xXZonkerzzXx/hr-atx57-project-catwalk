import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node-modules/swiper/swiper.min.css';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.swiper = new Swiper('#swiper-container', {
      direction: 'horizontal',
      speed: 500,
      spaceBetween: 50,
      slidesPerView: 4,
      slidesOffsetBefore: 50,
      slidesOffsetAfter: 50,
      slideToClickedSlide: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

  }

  render() {
    return (
      <div id="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
          <div className="swiper-slide">Slide 4</div>
          <div className="swiper-slide">Slide 5</div>
          <div className="swiper-slide">Slide 6</div>
        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    );
  }

}

export default ImageGallery;