import Slider from "react-slick";
import SliderItem from "../SliderMovies/SliderItem";
import { IMovieAndSeries } from "../MainSection/types";

interface IOwnProps {
  title: string;
  items: IMovieAndSeries[];
  mediaType: string;
}

const RecommendationSlider: React.FC<IOwnProps> = ({
  title,
  items,
  mediaType,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    display: "none",
    responsive: [
      {
        breakpoint: 1199,
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
        breakpoint: 899,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>
      <Slider {...settings}>
        {items.map((i) => (
          <SliderItem
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            voteAverage={i.vote_average}
            year={i.first_air_date ? i.first_air_date : i.release_date}
            ItemName={i.first_air_date ? i.name : i.title}
            mediaType={mediaType}
          />
        ))}
      </Slider>
    </div>
  );
};

export default RecommendationSlider;
