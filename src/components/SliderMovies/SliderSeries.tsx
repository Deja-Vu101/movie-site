import Slider from "react-slick";
import { ISeries } from "../MainSection/types";
import "./sliderMovies.scss";
import SliderItem from "./SliderItem";

interface IOwnProps {
  title: string;
  items: ISeries[];
}

const SliderSeries: React.FC<IOwnProps> = ({ title, items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
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
        {items.map((i) => (
          <SliderItem
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            voteAverage={i.vote_average}
            year={i.first_air_date}
            ItemName={i.original_name}
            mediaType="tv"
          />
        ))}
      </Slider>
    </>
  );
};

export default SliderSeries;
