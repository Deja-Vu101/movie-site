import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./photosSwiper.scss";
import React from "react";
import { Backdrop, Logo, Poster } from "../../globalTypes/globalTypes";
import { imgBaseUrl } from "../../apiConfigs/tmdb";

interface IOwnProps {
  photos: Backdrop[] | Poster[] | Logo[];
  title: string;
}

const PhotosSwiper: React.FC<IOwnProps> = ({ photos, title }) => {
  return (
    <div className="PhotosSwiper">
      <div className="Collection_Title">{title}</div>
      <div className="Title_Decoration"></div>
      <Swiper
        slidesPerView={title === "Posters" ? 1 : "auto"}
        centeredSlides={true}
        spaceBetween={title === "Posters" ? 1 : 15}
        pagination={{
          clickable: false,
        }}
        className="mySwiper"
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
    </div>
  );
};

export default PhotosSwiper;
