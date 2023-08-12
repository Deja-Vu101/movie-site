import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useEffect } from "react";
import { fetchTrending } from "../store/slices/trendingSlice";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";

const MoviesPage = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchTrending(pathname));
  }, []);

  return (
    <>
      <Header />
      <TrendingSlider />
      <MainSection>
        
      </MainSection>
    </>
  );
};

export default MoviesPage;
