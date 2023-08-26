import React from "react";
import Slider from "react-slick";
import SliderItemActor from "./SliderItemActor";
import { Cast } from "../../globalTypes/globalTypes";
import ProfilePoster from "../Poster/Person/ProfilePoster";
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
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          display: "none",
          arrows: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        },
      },
      //{
      //  breakpoint: 501,
      //  settings: {
      //    slidesToShow: 2,
      //    slidesToScroll: 1,
      //  },
      //},
    ],
  };
  return (
    <>
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>

      <Slider {...settings}>
        {items?.map((i) => (
          <div className="Cast" key={i.id}>
            <img
              className="Cast_Image"
              src={
                i.profile_path !== null
                  ? imgBaseUrl + i.profile_path
                  : PosterNotFound
              }
              alt="Person Poster"
            />
            <div className="CastHover">
              {i.name.length > 15 ? `${i.name.slice(0, 14)}...` : i.name}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SliderActors;
