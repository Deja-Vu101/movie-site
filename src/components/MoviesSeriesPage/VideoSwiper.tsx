import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IVideos } from "../../globalTypes/globalTypes";
import "./style.scss";

interface IOwnProps {
  results: IVideos[] | undefined;
}

const VideosSlider: React.FC<IOwnProps> = ({ results }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="videos-slider">
      <Slider {...settings}>
        {
          results && (
            <div key={results[0]?.id} className="video-slide">
              <iframe
                width={'100%'}
                height={'100%'}
                src={`https://www.youtube.com/embed/${results[0]?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )
        }
      </Slider>
    </div>
  );
};

export default VideosSlider;
