import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class MarcasAliadas extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear"
    };
    return (
      <div data-aos='fade-up'>
        <Slider {...settings}>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906096/MarcasAliadas/v54vucpfzi3spnkxq5kf_fttdl0.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906096/MarcasAliadas/uphiqvzhxjnl5qdqhjnk_wtn7f7.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906096/MarcasAliadas/kzivgisr25mjgsdtopnr_ohyboc.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906096/MarcasAliadas/tcyxxyhzgbckjdwpdfvn_izv6e7.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906096/MarcasAliadas/mu9gxdjlyhc4w7lu0epv_nbjucw.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/k6tydn0axdkrtvr6ogqy_fek5hs.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/kmnr2vodohgnrlbkbhir_xdmcma.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/k5hkcoag97ctqss0d6ps_feivkn.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/hjeycdq09wmiq4s1g2sl_xadnl7.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/f24pr74ev8pzqx6dudhf_ponjbd.png' alt="Imagen-Marca"></img>
          </div>
          <div className="flex m-0">
            <img className="sm:ml-[235.7px] md:ml-[336px] lg:ml-[460px] p-0 xl:ml-[587px] 2xl:ml-[229.5px]" src='https://res.cloudinary.com/dadzakyw1/image/upload/v1655906095/MarcasAliadas/caxeh8giof0twntv2lng_olgjjb.png' alt="Imagen-Marca"></img>
          </div>
        </Slider>
      </div>
    );
  }
}