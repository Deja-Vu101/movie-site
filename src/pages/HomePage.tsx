import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";
import CollectionSlidersMain from "../components/CollectionSlider/CollectionSlidersMain";
import { useInitialLoad } from "../hooks/useInitialLoad";
import GlobalLoader from "../components/Loaders/GlobalLoader/GlobalLoader";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchWatchList } from "../store/slices/watchListSlice";

const HomePage = () => {
  const { isAuth } = useAuth();
  const initialLoad = useInitialLoad(1000);
  const dispatch = useTypedDispatch();

  const { session_id } = useTypedSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchWatchList(session_id));
  });

  return (
    <>
      {isAuth ? null : <Navigate to={"/login"} />}

      {initialLoad ? (
        <GlobalLoader />
      ) : (
        <>
          <Header />
          <TrendingSlider />
          <MainSection>
            <CollectionSlidersMain />
          </MainSection>
        </>
      )}
    </>
  );
};

export default HomePage;
