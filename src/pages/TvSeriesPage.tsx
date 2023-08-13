import Header from "../components/Header/Header";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useEffect, useState } from "react";
import TrendingSlider from "../components/Trending/TrendingSlider";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  fetchPopularSeries,
  setPage,
} from "../store/slices/popularSeriesSlice";
import MainSection from "../components/MainSection/MainSection";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import PaginationButton from "../components/PaginationButton";
import {
  fetchTopRatedSeries,
  setPageRatedSeries,
} from "../store/slices/topRatedSeriesSlice";
import FilterPageButton from "../components/MoviesSeriesPage/FilterPageButton";
import { useInitialLoad } from "../hooks/useInitialLoad";
import GlobalLoader from "../components/Loaders/GlobalLoader/GlobalLoader";

export enum PageBtnEnum {
  "popular",
  "top_rated",
}

const TvSeriesPage = () => {
  const dispatch = useTypedDispatch();
  const {
    page: pagePopularSeries,
    results: resultsPopularSeries,
    loading: loadingPopular,
  } = useTypedSelector((state) => state.popularSeries);
  const {
    page: pageTopSeries,
    results: resultsTopSeries,
    loading: loadingRated,
  } = useTypedSelector((state) => state.topRatedSeries);
  const initialLoad = useInitialLoad(1000);

  const [selectedBtn, setSelectedBtn] = useState(PageBtnEnum[0]);

  const results =
    selectedBtn === PageBtnEnum[0] ? resultsPopularSeries : resultsTopSeries;

  useEffect(() => {
    if (selectedBtn !== PageBtnEnum[1]) {
      dispatch(fetchPopularSeries(pagePopularSeries));
    }
  }, [pagePopularSeries]);

  useEffect(() => {
    if (selectedBtn !== PageBtnEnum[0]) {
      dispatch(fetchTopRatedSeries(pageTopSeries));
    }
  }, [selectedBtn, pageTopSeries]);

  const onClickPageBtn = (filter: string) => {
    setSelectedBtn(filter);
  };
  return (
    <>
      {initialLoad ?? (loadingPopular || loadingRated) ? (
        <GlobalLoader />
      ) : (
        <>
          <Header />
          <TrendingSlider />

          <MainSection>
            {/* OUTLET needs to be added */}
            <div className="Header_MainSection">
              <div className="Title">Series</div>
              <FilterPageButton
                selectedBtn={selectedBtn}
                onClickPageBtn={onClickPageBtn}
                PageBtnEnum={PageBtnEnum}
              />
            </div>
            <div className="PosterList">
              {results.map((movie) => (
                <FilmPoster
                  key={movie.id}
                  id={movie.id}
                  poster={movie.poster_path}
                />
              ))}
            </div>
            <PaginationButton
              items={results}
              setPage={
                selectedBtn === PageBtnEnum[0] ? setPage : setPageRatedSeries
              }
            />
          </MainSection>
        </>
      )}
    </>
  );
};

export default TvSeriesPage;
