import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IVideos } from "../../globalTypes/globalTypes";
import "./style.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

interface IOwnProps {
  results: IVideos[] | undefined;
}

const VideosSlider: React.FC<IOwnProps> = ({ results }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoKey: string) => {
    setPlayingVideo(videoKey);
  };
  const swiperVideo = useSwiper();

  return (
    <div className="VideoSwiper">
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={15}
        navigation={{
          nextEl: ".swiper-video-next",
          prevEl: ".swiper-video-prev",
        }}
        modules={[Navigation]}
        className="mySwiperVideo"
        lazyPreloadPrevNext={1}
      >
        <div className="VideoSwiper_Slide">
          {results &&
            results.map((video, index) => (
              <SwiperSlide key={index + 1}>
                {playingVideo === video.key ? (
                  <div className="Video_Container">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="IframeVideo"
                    ></iframe>
                  </div>
                ) : (
                  <div className="PreviewVideo">
                    <img
                      className="ImgPreviewVideo"
                      src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                      alt="Video Preview"
                      onClick={() => handlePlayVideo(video.key)}
                    />
                    <button className="video-play btn-reset">
                      <svg width="68" height="48" viewBox="0 0 68 48">
                        <path
                          className="video-play-shape"
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                        ></path>
                        <path
                          className="video-play-icon"
                          d="M 45,24 27,14 27,34"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </div>
      </Swiper>

      <div className="SwiperButtons">
        <div className="swiper-video-prev">
          <button onClick={() => swiperVideo?.slidePrev()}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="swiper-video-next">
          <button onClick={() => swiperVideo?.slideNext()}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosSlider;
