import { Navigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import "./movie.scss";
import { useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { fetchMovie } from "../../../store/slices/movieSlice";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { imgBaseUrl } from "../../../apiConfigs/tmdb";
import VoteAverage from "../../Trending/VoteAverage";
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
import WatchNowBtn from "../../WatchNowBtn";
import WatchListBtn from "../../WatchListBtn/WatchListBtn";
import { useState } from "react";
import { fetchActors } from "../../../store/slices/actorsSlice";
import SliderActors from "../../SliderActors/SliderActors";
import GlobalLoader from "../../Loaders/GlobalLoader/GlobalLoader";
import { fetchVideo } from "../../../store/slices/videosSlice";
import VideosSwiper from "../VideoSwiper";
import { fetchPhotos } from "../../../store/slices/photosSlice";
import PhotosSwiper from "../PhotosSwiper";
import { fetchReviews } from "../../../store/slices/reviewsSlice";
import Reviews from "../../Reviews/Reviews";
import { fetchRating } from "../../../store/slices/ratingSlice";
import Rating from "../../Rating/Rating";
import RatingSection from "../../Rating/Rating";
import { fetchRecommendations } from "../../../store/slices/recommendationsSlice";
import SliderMovies from "../../SliderMovies/SliderMovies";
import RecommendationSlider from "../../Recommendation/RecommendationSlider";
import { useAuth } from "../../../hooks/useAuth";

const MoviePage = () => {
  const dispatch = useTypedDispatch();
  const { isAuth } = useAuth();
  const id = useParams().id;
  const { results, loading } = useTypedSelector((state) => state.movie);

  const { results: actors } = useTypedSelector((state) => state.actors);
  const { results: videos } = useTypedSelector((state) => state.video);
  const { backdrops, posters, logos } = useTypedSelector(
    (state) => state.photos
  );
  const { results: reviews, reviewsFirebase } = useTypedSelector(
    (state) => state.reviews
  );
  const { results: recommendations } = useTypedSelector(
    (state) => state.recommendations
  );

  const [handlePost, setHandlePost] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
      dispatch(fetchActors(id));
      dispatch(fetchVideo(id));
      dispatch(fetchPhotos(id));
      dispatch(fetchReviews(id));
      dispatch(fetchRating());
      dispatch(fetchRecommendations(id));
    }
  }, [id]);

  return (
    <div>
      {isAuth ? null : <Navigate to={"/login"} />}
      {loading ? (
        <GlobalLoader />
      ) : (
        <>
          <Header />
          <div className="BG">
            <div className="Backdrop_Container">
              <div
                className="BackDrop"
                style={{
                  backgroundImage: `url(${imgBaseUrl + results.backdrop_path})`,
                }}
              ></div>
              <div className="Continieu_BackDrop"></div>
            </div>

            <div className="Description">
              <div className="Description_Wrapper">
                <div>
                  <img src={imgBaseUrl + results.poster_path} alt="123" />
                </div>
                <div className="Description_Body">
                  <div className="Description_Title">
                    {results.title} {results.release_date?.slice(0, 4)}
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

                  <div className="Description_Overview">{results.overview}</div>

                  <div className="Description_Button">
                    <FavoriteButton id={results.id} mediaType="movie" />
                    <WatchListBtn id={results.id} mediaType="movie" />
                    <WatchNowBtn />
                    {typeof id !== "undefined" && (
                      <RatingSection movieID={id} />
                    )}
                  </div>
                  <div className="SliderActors">
                    <SliderActors items={actors.cast} title="Top Billed Cast" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="MainSectionVideo">
            <div className="MainSectionVideo_Container">
              <div className="MainSectionVideo_Wrapper">
                <div className="Section">
                  <div className="Collection_Title">Videos</div>
                  <div className="Title_Decoration"></div>
                  {/* <VideosSwiper results={videos} /> */}
                </div>

                <div className="Section">
                  <PhotosSwiper photos={backdrops} title="Backdrops" />
                </div>

                <div className="Section SectionPoster">
                  <PhotosSwiper photos={posters} title="Posters" />
                </div>

                <div className="Section">
                  <Reviews
                    reviews={reviews}
                    movieId={id}
                    setHandlePost={setHandlePost}
                    handlePost={handlePost}
                    reviewsFirebase={reviewsFirebase}
                  />
                </div>

                <div className="Section">
                  <RecommendationSlider
                    title="You may also like"
                    items={recommendations}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
