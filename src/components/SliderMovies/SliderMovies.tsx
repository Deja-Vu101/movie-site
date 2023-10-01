import Slider from "react-slick";
import { IMovie } from "../MainSection/types";
import "./sliderMovies.scss";
import SliderItem from "./SliderItem";

interface IOwnProps {
  title: string;
  items: IMovie[];
}

const SliderMovies: React.FC<IOwnProps> = ({ title, items }) => {
  //const settings = {
  //  dots: false,
  //  infinite: true,
  //  speed: 500,
  //  slidesToShow: 5,
  //  slidesToScroll: 3,
  //  responsive: [
  //    {
  //      breakpoint: 1450,
  //      settings: {
  //        slidesToShow: 4,
  //        slidesToScroll: 2,
  //        infinite: true,
  //        dots: false,
  //        display: "none",
  //        arrows: false,
  //      },
  //    },
  //    {
  //      breakpoint: 1200,
  //      settings: {
  //        slidesToShow: 2,
  //        slidesToScroll: 2,
  //        infinite: true,
  //        dots: true,
  //        arrows: false,
  //      },
  //    },
  //    {
  //      breakpoint: 1020,
  //      settings: {
  //        slidesToShow: 2,
  //        slidesToScroll: 1,
  //        initialSlide: 2,
  //        arrows: false,
  //      },
  //    },
  //    //{
  //    //  breakpoint: 501,
  //    //  settings: {
  //    //    slidesToShow: 2,
  //    //    slidesToScroll: 1,
  //    //  },
  //    //},
  //  ],
  //};
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1450,
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
        breakpoint: 1120,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="Slider_Wrapper">
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>
      <Slider {...settings}>
        {items.map((i) => (
          <SliderItem
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            voteAverage={i.vote_average}
            year={i.release_date}
            ItemName={i.title}
            mediaType="movie"
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderMovies;
