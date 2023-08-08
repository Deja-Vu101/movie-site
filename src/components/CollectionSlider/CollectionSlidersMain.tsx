import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchPopularMovie } from "../../store/slices/popularMovies";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import SliderMovies from "../SliderMovies/SliderMovies";
import { fetchPopularSeries } from "../../store/slices/popularSeries";
import "./collectionSlider.scss";

interface IOwnProps {}

const CollectionSlidersMain: React.FC<IOwnProps> = ({}) => {
  const dispatch = useTypedDispatch();
  const {
    loading: loadingMovies,
    page: pageMovies,
    results: resultsMovies,
  } = useTypedSelector((state) => state.popularMovies);
  const {
    page: pageSeries,
    loading: loadingSeries,
    results: resultsSeries,
  } = useTypedSelector((state) => state.popularSeries);

  useEffect(() => {
    dispatch(fetchPopularMovie(pageMovies));
    dispatch(fetchPopularSeries(pageSeries));
  }, []);

  return (
    <div className="CollectionSlider">
      <div className="CollectionSlider_Wrapper">
        <div>
          <SliderMovies title="popular movies" items={resultsMovies} />
        </div>
        <div>
          <SliderMovies title="popular series" items={resultsSeries} />
        </div>
      </div>
    </div>
  );
};

export default CollectionSlidersMain;