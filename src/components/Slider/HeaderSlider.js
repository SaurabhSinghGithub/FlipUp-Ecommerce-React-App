import React from 'react'
import "./HeaderSlider.scss"
import { sliderImgs } from "../../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { hero1, hero2 } from '../../utils/images';

const HeaderSlider = () => {

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="slider">
            <div className="container">
                <div className="slider-content">
                    <Slider {...settings}>
                        <div className='slider-item'>
                            {/* <img src={sliderImgs[0]} alt="slider-1" /> */}
                            <img src={hero1} alt="slider-1" />
                        </div>
                        <div className='slider-item'>
                            {/* <img src={sliderImgs[1]} alt="slider-2" /> */}
                            <img src={hero2} alt="slider-2" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default HeaderSlider;