import Slider from "react-slick";
import CardsItem from "./CardsItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { imgBaseUrl } from "../../apiConfigs/tmdb";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const CardsTrending = () => {
  const { results } = useTypedSelector((state) => state.trending);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

  useEffect(() => {
    setVisibleSlides([0, 19]);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    afterChange: (currentSlide: number) => {
      setVisibleSlides((prev) => [...prev, currentSlide]);
    },
  };

  return (
    <div className="CardsTrending">
      <Slider {...settings}>
        {results.map((i, index) => (
          <CardsItem
            key={i.id}
            url={imgBaseUrl + i.backdrop_path}
            title={i.title ? i.title : i.original_name}
            overview={i.overview}
            genres={i.genre_ids}
            voteAverage={i.vote_average}
            mediaType={i.media_type}
            id={i.id}
            isVisible={visibleSlides.includes(index)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CardsTrending;
