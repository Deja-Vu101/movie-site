import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";
import CollectionSlidersMain from "../components/CollectionSlider/CollectionSlidersMain";
import { useInitialLoad } from "../hooks/useInitialLoad";
import GlobalLoader from "../components/Loaders/GlobalLoader/GlobalLoader";

const HomePage = () => {
  const { isAuth } = useAuth();
  const initialLoad = useInitialLoad(1000);

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
