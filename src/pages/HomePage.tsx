import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";
import CollectionSlidersMain from "../components/CollectionSlider/CollectionSlidersMain";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useEffect } from "react";
import { fetchGenres } from "../store/slices/genresSlice";

const HomePage = () => {
  const dispatch = useTypedDispatch()
  const { isAuth } = useAuth();

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  return (
    <>
      {isAuth ? null : <Navigate to={"/login"} />}
      <Header />

      <TrendingSlider />
      <MainSection>
        <CollectionSlidersMain />
      </MainSection>
    </>
  );
};

export default HomePage;
