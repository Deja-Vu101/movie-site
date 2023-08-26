import { useParams } from "react-router-dom";
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
import { addReviews, fetchReviews } from "../../../store/slices/reviewsSlice";
import Reviews from "../../Reviews/Reviews";

import { db } from "../../../apiConfigs/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { IReviews } from "../../../globalTypes/globalTypes";

const MoviePage = () => {
  const dispatch = useTypedDispatch();
  const id = useParams().id;
  const { results, loading } = useTypedSelector((state) => state.movie);

  const { results: actors } = useTypedSelector((state) => state.actors);
  //const { results: videos } = useTypedSelector((state) => state.video);
  //const { backdrops, posters, logos } = useTypedSelector(
  //  (state) => state.photos
  //);
  const { results: reviews, reviewsFirebase } = useTypedSelector(
    (state) => state.reviews
  );

  const [handlePost, setHandlePost] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
      //dispatch(fetchActors(id));
      //dispatch(fetchVideo(id));
      //dispatch(fetchPhotos(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviews(id));
    }
  }, [handlePost]);

  return (
    <div>
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
                {/*<div className="Section">
                  <div className="Collection_Title">Videos</div>
                  <div className="Title_Decoration"></div>
                  <VideosSwiper results={videos} />
                </div>

                <div className="Section">
                  <PhotosSwiper photos={backdrops} title="Backdrops" />
                </div>

                <div className="Section SectionPoster">
                  <PhotosSwiper photos={posters} title="Posters" />
                </div>*/}

                <div className="Section">
                  <Reviews
                    reviews={reviews}
                    movieId={id}
                    setHandlePost={setHandlePost}
                    handlePost={handlePost}
                    reviewsFirebase={reviewsFirebase}
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
