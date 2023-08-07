import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";
import TrendingSlider from "../components/TrendingSlider/TrendingSlider";
import MainSection from "../components/MainSection/MainSection";

const HomePage = () => {
  const { isAuth } = useAuth();

  return (
    <>
      {isAuth ? null : <Navigate to={"/login"} />}
      <Header />

      <TrendingSlider />
      <MainSection>
        <h2>123</h2>
      </MainSection>
    </>
  );
};

export default HomePage;
