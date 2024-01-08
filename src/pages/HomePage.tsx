import Header from "../components/Header/Header";
import TrendingSlider from "../components/Trending/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";
import CollectionSlidersMain from "../components/CollectionSlider/CollectionSlidersMain";
import { useInitialLoad } from "../hooks/useInitialLoad";
import GlobalLoader from "../components/Loaders/GlobalLoader/GlobalLoader";

const HomePage = () => {
  const initialLoad = useInitialLoad(1000);

  return (
    <>
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
