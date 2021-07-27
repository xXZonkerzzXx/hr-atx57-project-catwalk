import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node-modules/swiper/swiper.scss';
import '../../node-modules/swiper/components/navigation.scss';
import '../../node-modules/swiper/components/pagination.scss';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.swiper = new Swiper('.swiper-container', {
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
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
        </div>
        <div class="swiper-pagination" />
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </div>
    );
  }

}

export default ImageGallery;