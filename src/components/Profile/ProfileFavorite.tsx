import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProfilePageItem from "./ProfilePageItem";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

const ProfileFavorite = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const mediaType =
    location.pathname === "/profile/favorite/movies" ? "movies" : "tv";

  const { loading, results, removedItem } = useTypedSelector(
    (state) => state.favoriteList
  );

  useEffect(() => {
    dispatch(fetchFavoriteList(mediaType));
  }, []);

  const resultsWithoutRemoved = results.filter(
    (item) => !removedItem.includes(item.id)
  );
  return (
    <>
      <Header />
      <ProfileHeader />

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
