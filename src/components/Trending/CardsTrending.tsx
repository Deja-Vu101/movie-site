import Slider from "react-slick";
import CardsItem from "./CardsItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { imgBaseUrl } from "../../apiConfigs/tmdb";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardsTrending = () => {
  const { results } = useTypedSelector((state) => state.trending);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1910,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          display: "none",
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="CardsTrending">
      <Slider {...settings}>
        {results.map((i) => (
          <CardsItem
            key={i.id}
            url={imgBaseUrl  + i.backdrop_path}
            title = {i.title ? i.title : i.original_name}
            overview={i.overview}
            genres={i.genre_ids}
            voteAverage={i.vote_average}
          />
        ))}
      </Slider>
      <div className="imgFilter"></div>
    </div>
  );
};

export default CardsTrending;
