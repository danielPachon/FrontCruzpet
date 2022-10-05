import React, { Component } from "react";
import Slider from "react-slick";

export class CarouselHome extends Component{
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      adaptiveHeight: true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655905981/CarouselHome/pza1anuegkpwacyk33pm_gctzud.jpg' alt="slider-1" className='w-full h-52 object-cover sm:h-72 lg:h-80 xl:h-92'/>
          </div>
          <div>
            <img src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655905981/CarouselHome/fc4bykvq1q2smxigzgzo_aoi8ag.jpg' alt="slider-2" className='w-full h-52 object-cover sm:h-72 lg:h-80 xl:h-92'/>
          </div>
          <div>
            <img src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655905980/CarouselHome/xjd5jkllv3xz46puusfo_eknjjz.jpg' alt="slider-3" className='w-full h-52 object-cover sm:h-72 lg:h-80 xl:h-92'/>
          </div>
          <div>
            <img src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655905979/CarouselHome/guiqodm5lb7bk6cs4cvi_jya2wc.jpg' alt="slider-4" className='w-full h-52 object-cover sm:h-72 lg:h-80 xl:h-92'/>
          </div>
        </Slider>
      </div>
    );
  }
}
