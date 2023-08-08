import { useEffect } from "react";
import "./style.trendingslider.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchTrending } from "../../store/slices/trendingSlice";
import CardsTrending from "./CardsTrending";

const TrendingSlider = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTrending());
  }, []);

  return (
    <div className="TrendingSlider">
      <CardsTrending />
    </div>
  );
};

export default TrendingSlider;
