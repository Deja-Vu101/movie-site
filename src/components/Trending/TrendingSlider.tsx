import { useEffect, useState } from "react";
import "./style.trendingslider.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchTrending } from "../../store/slices/trendingSlice";
import CardsTrending from "./CardsTrending";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import GlobalLoader from "../Loaders/GlobalLoader/GlobalLoader";
import { useLocation } from "react-router-dom";
import { fetchGenres } from "../../store/slices/genresSlice";

const TrendingSlider = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();

  const { loading } = useTypedSelector((state) => state.trending);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowLoader(true);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(fetchTrending(pathname));
    dispatch(fetchGenres())
  }, []);

  return (
    <div className="TrendingSlider">
      {showLoader ? <GlobalLoader /> : <CardsTrending />}
    </div>
  );
};

export default TrendingSlider;
