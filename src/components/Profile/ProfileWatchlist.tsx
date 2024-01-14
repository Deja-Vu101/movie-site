import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchWatchList } from "../../store/slices/watchListSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProfilePageItem from "./ProfilePageItem";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import ProfileHeader from "./ProfileHeader";

const ProfileWatchlist = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const mediaType =
    location.pathname === "/profile/watchlist/movies" ? "movies" : "tv";

  const {
    loading: loadingWatchlist,
    results: resultsWatchlist,
    removedItem,
  } = useTypedSelector((state) => state.watchList);

  useEffect(() => {
    dispatch(fetchWatchList(mediaType));
  }, [mediaType]);

  const resultsWithoutRemoved = resultsWatchlist.filter(
    (item) => !removedItem.includes(item.id)
  );
  return (
    <>
      <Header />
      <ProfileHeader />
      <div className="Watchlist_Wrapper">
        <div className="Filter">
          <div className="Title">My Watchlist</div>
        </div>
        <div className="ProfilePage_Items">
          {loadingWatchlist ? (
            <h2>Loading...</h2>
          ) : (
            resultsWithoutRemoved.map((i) => (
              <ProfilePageItem
                key={i.id}
                poster={i.poster_path}
                voteAverage={i.vote_average}
                title={i.title}
                release={i.release_date}
                overview={i.overview}
                id={i.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileWatchlist;
