import React from "react";
import Slider from "react-slick";
import { Cast } from "../../globalTypes/globalTypes";
import { imgBaseUrl } from "../../apiConfigs/tmdb";
import PosterNotFound from "../../assets/img/posterNotFound.png";
import "./sliderActors.scss";

interface IOwnProps {
  title: string;
  items: Cast[];
}
const SliderActors: React.FC<IOwnProps> = ({ items, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,

    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="CardItem">
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>

      <Slider {...settings}>
        {items?.map((i) => (
          <div className="Cast" key={i.id}>
            <div className="Cast_Container">
              <img
                className="Cast_Image"
                src={
                  i.profile_path !== null
                    ? imgBaseUrl + i.profile_path
                    : PosterNotFound
                }
                alt="Person Poster"
              />
              <div className="CastHover truncate">{i.name}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderActors;
