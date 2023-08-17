import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchWatchList } from "../../store/slices/watchListSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProfilePageItem from "./ProfilePageItem";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";

const ProfileWatchlist = () => {
  const dispatch = useTypedDispatch();

  const {
    loading: loadingWatchlist,
    results: resultsWatchlist,
    removedItem,
  } = useTypedSelector((state) => state.watchList);
  const { results } = useTypedSelector((state) => state.favoriteList);

  useEffect(() => {
    dispatch(fetchWatchList());
  }, []);

  // useEffect(() => {
  //   dispatch(fetchFavoriteList());
  // }, [results]);

  const resultsWithoutRemoved = resultsWatchlist.filter(
    (item) => !removedItem.includes(item.id)
  );
  return (
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
  );
};

export default ProfileWatchlist;
