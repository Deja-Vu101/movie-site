import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchWatchList } from "../store/slices/watchListSlice";
import { fetchFavouriteList } from "../store/slices/favouriteList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ProfilePageItem from "../components/Profile/ProfilePageItem";
import { useEffect } from "react";
import "../components/Profile/profile.scss";

const ProfilePage = () => {
  const dispatch = useTypedDispatch();
  //  const { loading: loadingFavorite, results: resultsFavorite } =
  //    useTypedSelector((state) => state.watchList);
  const {
    loading: loadingWatchlist,
    results: resultsWatchlist,
    removedItem,
  } = useTypedSelector((state) => state.watchList);

  const handlerWatchlist = (type: string) => {
    if (type === "favorite") {
      dispatch(fetchFavouriteList());
    } else {
      dispatch(fetchWatchList());
    }
  };

  useEffect(() => {
    console.log(removedItem, "removedItem");
  }, [removedItem]);

  const resultsWithoutRemoved = resultsWatchlist.filter(
    (item) => !removedItem.includes(item.id)
  );
  return (
    <>
      ProfilePage
      <div onClick={() => handlerWatchlist("favorite")}>Favorite</div>
      <div onClick={() => handlerWatchlist("watchlist")}>Watchlist</div>
      <div className="ProfilePage_Wrapper">
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

export default ProfilePage;
