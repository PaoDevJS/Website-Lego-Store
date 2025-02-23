import { Link } from "react-router-dom"
import { Component } from "react"
import Slider from "react-slick";

//  slick-carousel for css and font
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// List images
import banner1 from "../assets/images/banner1.jpg"
import banner2 from "../assets/images/banner2.jpg"
import banner3 from "../assets/images/banner3.webp"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  

const Banner = () => {
    const listImageUrl = [
        banner1, banner2, banner3
    ]

    let settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

  return (
    <div>
        <Slider {...settings}>
            {
                listImageUrl.map( (item, index) => {
                    return (
                        <div key={index} className="w-full 2xl:h-[600px] lg:h-[400px] h-[200px]">
                            <Link >
                                <img src={item} alt="" className={`w-full h-full object-cover`}/>
                            </Link>
                        </div>
                    )
                })
            }
        </Slider>
    </div>
  )
}

export default Banner