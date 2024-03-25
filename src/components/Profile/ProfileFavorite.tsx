import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProfilePageItem from "./ProfilePageItem";
import { fetchForTypeFavorite } from "../../store/slices/favoriteSlice";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import Loader from "../Loaders/Loader/Loader";

const ProfileFavorite = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const mediaType =
    location.pathname === "/profile/favorite/movies" ? "movies" : "tv";

  const { loading, typedFavoriteResults } = useTypedSelector(
    (state) => state.favoriteList
  );

  useEffect(() => {
    dispatch(fetchForTypeFavorite(mediaType));
  }, [mediaType]);

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
            <Loader />
          ) : (
            typedFavoriteResults.map((i) => (
              <ProfilePageItem
                key={i.id}
                poster={i.poster_path}
                voteAverage={i.vote_average}
                title={i.first_air_date ? i.name : i.title}
                release={i.first_air_date ? i.first_air_date : i.release_date}
                overview={i.overview}
                id={i.id}
                mediaType={i.first_air_date ? "tv" : "movie"}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileFavorite;
