import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProfilePageItem from "./ProfilePageItem";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";

const ProfileFavorite = () => {
  const dispatch = useTypedDispatch();

  const { loading, results, removedItem } = useTypedSelector(
    (state) => state.favoriteList
  );

  useEffect(() => {
    dispatch(fetchFavoriteList());
  }, []);

  const resultsWithoutRemoved = results.filter(
    (item) => !removedItem.includes(item.id)
  );
  return (
    <>
      <div className="Watchlist_Wrapper">
        <div className="Filter">
          <div className="Title">My Favorite</div>
        </div>
        <div className="ProfilePage_Items">
          {loading ? (
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

export default ProfileFavorite;
