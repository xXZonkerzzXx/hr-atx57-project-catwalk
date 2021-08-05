import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Avatar } from '@material-ui/core';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.getSwiperSlides = this.getSwiperSlides.bind(this);
  }

  componentDidMount() {
    this.swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      observer: true,
      observeParents: true,
      speed: 300,
      spaceBetween: 50,
      slidesPerView: 4,
      slidesOffsetBefore: 50,
      slidesOffsetAfter: 50,
      slideToClickedSlide: true,
      grabCursor: true,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });

  }

  getSwiperSlides() {
    if (this.props.currentStyles[this.props.mainImgIndex] !== undefined) {
      return this.props.currentStyles[this.props.mainImgIndex].photos.map((photo) => {
        return <div className="slide-image"><Avatar alt={this.props.currentStyles[this.props.mainImgIndex].name} src={photo.thumbnail_url} /></div>
      })
    }
  }

  render() {
    console.log(this.props.currentStyles[this.props.mainImgIndex]);
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {this.getSwiperSlides()}
        </div>
        {/* <div className="swiper-pagination" /> */}
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    );
  }

}

export default ImageGallery;