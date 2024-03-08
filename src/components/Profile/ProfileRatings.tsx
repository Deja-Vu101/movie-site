import { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from "../Header/Header";
import ProfileHeader from "./ProfileHeader";
import ProfilePageItem from "./ProfilePageItem";
import { fetchRating } from "../../store/slices/ratingSlice";
import Loader from "../Loaders/Loader/Loader";

const ProfileRatings = () => {
  const dispatch = useTypedDispatch();
  const { loading, results } = useTypedSelector((state) => state.rating);

  useEffect(() => {
    dispatch(fetchRating());
  }, []);
  return (
    <>
      <Header />
      <ProfileHeader />
      <div className="Watchlist_Wrapper">
        <div className="Filter">
          <div className="Title">Ratings</div>
        </div>
        <div className="ProfilePage_Items">
          {loading ? (
            <Loader />
          ) : (
            results.map((i) => (
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

export default ProfileRatings;
