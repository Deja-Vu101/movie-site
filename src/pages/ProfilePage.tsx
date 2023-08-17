import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchWatchList } from "../store/slices/watchListSlice";
import { fetchFavoriteList } from "../store/slices/favoriteSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ProfilePageItem from "../components/Profile/ProfilePageItem";
import { useEffect, useState } from "react";
import "../components/Profile/profile.scss";
import { useNavigate } from "react-router-dom";
import ProfileWatchlist from "../components/Profile/ProfileWatchlist";
import ProfileFavorite from "../components/Profile/ProfileFavorite";

const ProfilePage = () => {
  const [filterList, setFilterList] = useState("");
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  // const { loading: loadingFavorite, results: resultsFavorite } =
  //   useTypedSelector((state) => state.favoriteList);

  useEffect(() => {
    if (filterList === "favorite") {
      navigate("/profile/favorite");
      dispatch(fetchFavoriteList());
    } else if (filterList === "watchlist") {
      navigate("/profile/watchlist");
      dispatch(fetchWatchList());
    }
  }, [filterList]);

  return (
    <div className="ProfilePage_Wrapper">
      ProfilePage
      <div onClick={() => setFilterList("favorite")}>Favorite</div>
      <div onClick={() => setFilterList("watchlist")}>Watchlist</div>
      {filterList === "watchlist" ? <ProfileWatchlist /> : null}
      {filterList === "favorite" ? <ProfileFavorite /> : null}
    </div>
  );
};

export default ProfilePage;
