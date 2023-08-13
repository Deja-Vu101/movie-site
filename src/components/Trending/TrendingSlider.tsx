import { useEffect } from "react";
import "./style.trendingslider.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchTrending } from "../../store/slices/trendingSlice";
import CardsTrending from "./CardsTrending";

import { useLocation } from "react-router-dom";
import { fetchGenres } from "../../store/slices/genresSlice";

const TrendingSlider = () => {
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchTrending(pathname));
    dispatch(fetchGenres());
  }, []);

  return (
    <div className="TrendingSlider">
      <CardsTrending />
    </div>
  );
};

export default TrendingSlider;
