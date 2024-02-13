import { useParams } from "react-router-dom";
import Header from "../../../Header/Header";
import "../movie.scss";
import { useEffect } from "react";
import { useTypedDispatch } from "../../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { imgBaseUrl } from "../../../../apiConfigs/tmdb";
import VoteAverage from "../../../Trending/VoteAverage/VoteAverage";
import FavoriteButton from "../../../FavoriteButton/FavoriteButton";
import WatchNowBtn from "../../../WatchNowBtn";
import WatchListBtn from "../../../WatchListBtn/WatchListBtn";
import { useState } from "react";
import { fetchActors } from "../../../../store/slices/actorsSlice";
import SliderActors from "../../../SliderActors/SliderActors";
import GlobalLoader from "../../../Loaders/GlobalLoader/GlobalLoader";
import { fetchVideo } from "../../../../store/slices/videosSlice";
import VideosSwiper from "../../VideoSwiper";
import { fetchPhotos } from "../../../../store/slices/photosSlice";
import PhotosSwiper from "../../PhotosSwiper";
import { fetchReviews } from "../../../../store/slices/reviewsSlice";
import Reviews from "../../../Reviews/Reviews";
import { fetchRating } from "../../../../store/slices/ratingSlice";
import RatingSection from "../../../Rating/Rating";
import { fetchRecommendations } from "../../../../store/slices/recommendationsSlice";
import RecommendationSlider from "../../../Recommendation/RecommendationSlider";
import { fetchSeries } from "../../../../store/slices/seriesSlice";

const SeriesPage = () => {
  const dispatch = useTypedDispatch();
  const mediaType = "tv";
  const id = useParams().id;
  const { results, loading } = useTypedSelector((state) => state.series);

  const { results: actors } = useTypedSelector((state) => state.actors);
  const { results: videos } = useTypedSelector((state) => state.video);
  const { backdrops, posters } = useTypedSelector((state) => state.photos);
  const { results: reviews, reviewsFirebase } = useTypedSelector(
    (state) => state.reviews
  );
  const { results: recommendations } = useTypedSelector(
    (state) => state.recommendations
  );

  const [handlePost, setHandlePost] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSeries(id));
      dispatch(fetchActors({ id: id, mediaType: mediaType }));
      dispatch(fetchVideo({ id: id, mediaType: mediaType }));
      dispatch(fetchPhotos({ id: id, mediaType: mediaType }));
      dispatch(fetchReviews({ id: id, mediaType: mediaType }));
      dispatch(fetchRating());
      dispatch(fetchRecommendations({ id: id, mediaType: mediaType }));
    }
  }, [id]);

  useEffect(() => {
    if (!loading) {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [loading]);
  return (
    <div>
      {showLoader ? (
        <GlobalLoader />
      ) : (
        <>
          <Header />

          <div className="MediaPage">
            <div className="Backdrop_Container">
              <div
                className="BackDrop"
                style={{
                  backgroundImage: `url(${imgBaseUrl + results.backdrop_path})`,
                }}
              ></div>
              <div className="Continue_BackDrop">
                <div className="MainSection_Wrapper">
                  <div className="Description">
                    <div className="Description_Wrapper">
                      <div className="Description_Image">
                        <img
                          src={imgBaseUrl + results.poster_path}
                          alt="Poster"
                        />
                      </div>
                      <div className="Description_Body">
                        <div className="Description_Title">
                          {results.name} {results.first_air_date?.slice(0, 4)}
                        </div>
                        <div className="MovieVoteAndGenres">
                          {results.vote_average ? (
                            <VoteAverage voteAverage={results.vote_average} />
                          ) : null}

                          <div className="Genre">
                            <ul className="Genre_List">
                              {results.genres?.map((genre, index) => (
                                <li key={index} className="Genre_List_Item">
                                  {genre.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="Description_Overview">
                          {results.overview}
                        </div>

                        <div className="Description_Button">
                          <FavoriteButton
                            id={results.id}
                            mediaType={mediaType}
                          />
                          {typeof id !== "undefined" && (
                            <RatingSection filmID={id} mediaType={mediaType} />
                          )}

                          <a href="#video" className="MediaPage_WatchNowBtn">
                            <WatchNowBtn />
                          </a>

                          <WatchListBtn id={results.id} mediaType={mediaType} />
                        </div>
                        <section className="animated-section">
                          <div className="SliderActors">
                            <SliderActors
                              items={actors.cast}
                              title="Top Billed Cast"
                            />
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>

                  <div className="MainSectionVideo_Wrapper">
                    <section className="animated-section">
                      <div className="Section">
                        <div id="video" className="Collection_Title">
                          Video
                        </div>
                        <div className="Title_Decoration"></div>

                        <VideosSwiper results={videos} />
                      </div>
                    </section>

                    <section className="animated-section">
                      <div className="Section">
                        <PhotosSwiper photos={backdrops} title="Backdrops" />
                      </div>
                    </section>

                    <section className="animated-section">
                      <div className="Section SectionPoster">
                        <PhotosSwiper photos={posters} title="Posters" />
                      </div>
                    </section>

                    <section className="animated-section">
                      <div className="Section">
                        <Reviews
                          reviews={reviews}
                          movieId={id}
                          setHandlePost={setHandlePost}
                          handlePost={handlePost}
                          reviewsFirebase={reviewsFirebase}
                          mediaType={mediaType}
                        />
                      </div>
                    </section>

                    <section className="animated-section">
                      <div className="Section">
                        <RecommendationSlider
                          title="You may also like"
                          items={recommendations}
                          mediaType={mediaType}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeriesPage;
