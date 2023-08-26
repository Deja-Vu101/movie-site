import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IVideos } from "../../globalTypes/globalTypes";
import './style.scss';

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
        {results &&
          results.map((i) => (
            <div key={i.id} className="video-slide">
              <iframe
                width="1350"
                height="800"
                src={`https://www.youtube.com/embed/${i.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default VideosSlider;
