import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';

export const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((img) => {
        return (
          <Image key={img} src={img} alt='silder' width={'100%'} height={300} preview={false} />
        )
      })}
    </Slider>
  )
}
