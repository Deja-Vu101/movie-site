import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchPopularMovie } from "../../store/slices/popularMoviesSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import SliderMovies from "../SliderMovies/SliderMovies";
import { fetchPopularSeries } from "../../store/slices/popularSeriesSlice";
import "./collectionSlider.scss";
import SliderSeries from "../SliderMovies/SliderSeries";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";
import { fetchWatchList } from "../../store/slices/watchListSlice";
import { useAuth } from "../../hooks/useAuth";

const CollectionSlidersMain: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { isGuest } = useAuth();
  const { page: pageMovies, results: resultsMovies } = useTypedSelector(
    (state) => state.popularMovies
  );
  const { page: pageSeries, results: resultsSeries } = useTypedSelector(
    (state) => state.popularSeries
  );

  useEffect(() => {
    dispatch(fetchPopularMovie(pageMovies));
    dispatch(fetchPopularSeries(pageSeries));
    dispatch(fetchFavoriteList("movies"));
    dispatch(fetchFavoriteList("tv"));
    dispatch(fetchWatchList("movies"));
    dispatch(fetchWatchList("tv"));
  }, []);

  return (
    <div className="CollectionSlider">
      <div className="CollectionSlider_Wrapper">
        <div>
          <SliderMovies title="popular movies" items={resultsMovies} />
        </div>
        <div>
          <SliderSeries title="popular series" items={resultsSeries} />
        </div>
      </div>
    </div>
  );
};

export default CollectionSlidersMain;
