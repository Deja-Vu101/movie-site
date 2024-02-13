import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./photosSwiper.scss";
import React, { useEffect, useState } from "react";
import { Backdrop, Logo, Poster } from "../../globalTypes/globalTypes";
import { imgBaseUrl } from "../../apiConfigs/tmdb";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

interface IOwnProps {
  photos: Backdrop[] | Poster[] | Logo[];
  title: string;
}

const PhotosSwiper: React.FC<IOwnProps> = ({ photos, title }) => {
  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 900) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 600) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(2);
      }
    };

    updateSlidesPerView();

    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const swiper = useSwiper();

  return (
    <div className="PhotosSwiper">
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>
      <Swiper
        slidesPerView={title === "Posters" ? slidesPerView : "auto"}
        centeredSlides={title === "Posters" ? false : true}
        spaceBetween={title === "Posters" ? 1 : 15}
        navigation={
          title === "Posters"
            ? {}
            : {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
        }
        modules={[Navigation]}
        className="mySwiper"
        lazyPreloadPrevNext={1}
      >
        {photos.map((i) => (
          <SwiperSlide key={i.file_path}>
            <div
              className={title === "Posters" ? "Image SectionPoster" : "Image"}
            >
              <img
                src={imgBaseUrl + i.file_path}
                alt="Image"
                className="Image_Content"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {title !== "Posters" && (
        <div className="SwiperButtons">
          <div className="swiper-button-prev">
            <button onClick={() => swiper?.slidePrev()}>
              <FaChevronLeft />
            </button>
          </div>
          <div className="swiper-button-next">
            <button onClick={() => swiper?.slideNext()}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosSwiper;
