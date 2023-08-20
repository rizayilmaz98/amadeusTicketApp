import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AmericanAirlines from "../../assets/americanAirlinesLogo.png";
import CorendonAirlines from "../../assets/corendonLogo.png";
import LufthansaAirlines from "../../assets/lufthansaLogo.png";
import QatarAirlines from "../../assets/qatarLogo.png";
import SunexpressAirlines from "../../assets/sunexpressLogo.png";
import ThyAirlines from "../../assets/thyLogo.png";

function Company() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    gap: 3,
    prevArrow: <></>,
    nextArrow: <></>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="py-5 bg-tenth">
      <div className=" my-5">
        
          <h4 className="text-center">Havayolu Şirketleri</h4>
          <hr className="text-third"/>
        </div>
        
        <div className="mt-5">
          <Slider {...settings} className="slider">
            <div className="bg-white py-4 slick-item">
              <img
                src={ThyAirlines}
                alt="thyLogo"
                className="logoImg mx-auto"
              />
            </div>
            <div className=" bg-white py-4 slick-item">
              <img
                src={SunexpressAirlines}
                alt="seLogo"
                className="logoImg mx-auto"
              />
            </div>
            <div className=" bg-white py-4 slick-item">
              <img
                src={QatarAirlines}
                alt="qaLogo"
                className="logoImg mx-auto"
              />
            </div>
            <div className=" bg-white py-4 slick-item">
              <img
                src={LufthansaAirlines}
                alt="laLogo"
                className="logoImg mx-auto"
              />
            </div>
            <div className=" bg-white py-4 slick-item">
              <img
                src={CorendonAirlines}
                alt="caLogo"
                className="logoImg mx-auto"
              />
            </div>
            <div className=" bg-white py-4 slick-item">
              <img
                src={AmericanAirlines}
                alt="aaLogo"
                className="logoImg mx-auto"
              />
            </div>
          </Slider>
        </div>
        
        
      
    </section>
  );
}

export default Company;
