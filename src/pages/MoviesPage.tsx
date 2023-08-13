import Header from "../components/Header/Header";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useEffect, useState } from "react";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";
import { fetchPopularMovie, setPage } from "../store/slices/popularMoviesSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FilmPoster from "../components/Poster/FilmPoster/FilmPoster";
import "../components/MoviesSeriesPage/style.scss";
import PaginationButton from "../components/PaginationButton";
import { PageBtnEnum } from "./TvSeriesPage";
import { fetchTopRatedMovies } from "../store/slices/topRatedMoviesSlice";
import FilterPageButton from "../components/MoviesSeriesPage/FilterPageButton";

const MoviesPage = () => {
  const dispatch = useTypedDispatch();
  const { page: pagePopularMovies, results: resultsPopularMovies } =
    useTypedSelector((state) => state.popularMovies);
  const { page: pageTopMovies, results: resultsTopMovies } = useTypedSelector(
    (state) => state.topRatedMovies
  );
  const [selectedBtn, setSelectedBtn] = useState(PageBtnEnum[0]);

  const results =
    selectedBtn === PageBtnEnum[0] ? resultsPopularMovies : resultsTopMovies;

  useEffect(() => {
    dispatch(fetchPopularMovie(pagePopularMovies));
  }, [pagePopularMovies]);

  useEffect(() => {
    if (selectedBtn !== PageBtnEnum[0]) {
      dispatch(fetchTopRatedMovies(pageTopMovies));
    }
  }, [pageTopMovies, selectedBtn]);

  const onClickPageBtn = (filter: string) => {
    setSelectedBtn(filter);
  };
  return (
    <div className="MoviesSeriesPage">
      <Header />
      <TrendingSlider />

      <MainSection>
        <div className="Header_MainSection">
          <div className="Title">Movies</div>
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
        <PaginationButton items={results} setPage={setPage} />
      </MainSection>
    </div>
  );
};

export default MoviesPage;
