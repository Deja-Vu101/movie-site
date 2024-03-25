import { useState, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Fone from "../../assets/img/fone1.png";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useNavigate } from "react-router-dom";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";
import { fetchWatchList } from "../../store/slices/watchListSlice";
import { fetchRating } from "../../store/slices/ratingSlice";
import { useAuth } from "../../hooks/useAuth";
import ProfileAvatar from "./ProfileHeaderComponents/ProfileAvatar";
import ProfileInfo from "./ProfileHeaderComponents/ProfileInfo";
import ProfileMenuItem from "./ProfileHeaderComponents/ProfileMenuItem";
import ProfileSubMenu from "./ProfileHeaderComponents/ProfileSubMenu";
import ProfileSubMenuItem from "./ProfileHeaderComponents/ProfileSubMenuItem";

const ProfileHeader = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [filterList, setFilterList] = useState("");

  const [showFavoritesMenu, setShowFavoritesMenu] = useState(false);
  const { name, avatarURL, expires_at } = useTypedSelector(
    (state) => state.user
  );

  const [avatarUrl, setAvatarURL] = useState(avatarURL);

  const [showOverviewMenu, setShowOverviewMenu] = useState(false);

  const [showWatchlistMenu, setShowWatchlistMenu] = useState(false);

  const handleOverviewMouseEnter = () => setShowOverviewMenu(true);
  const handleOverviewMouseLeave = () => setShowOverviewMenu(false);
  const handleFavoritesMouseEnter = () => setShowFavoritesMenu(true);
  const handleFavoritesMouseLeave = () => setShowFavoritesMenu(false);
  const handleWatchlistMouseEnter = () => setShowWatchlistMenu(true);
  const handleWatchlistMouseLeave = () => setShowWatchlistMenu(false);

  useEffect(() => {
    const listTypeMap: { [key: string]: { path: string; type?: string } } = {
      "favorites-movies": { path: "/profile/favorite/movies", type: "movies" },
      "favorites-series": { path: "/profile/favorite/series", type: "tv" },
      "watchlist-movies": { path: "/profile/watchlist/movies", type: "movies" },
      "watchlist-series": { path: "/profile/watchlist/series", type: "tv" },
      ratings: { path: "/profile/ratings" },
    };

    const selectedList = listTypeMap[filterList];

    if (selectedList) {
      navigate(selectedList.path);
      dispatch(
        selectedList.type === "movies"
          ? fetchFavoriteList("movies")
          : fetchWatchList("tv")
      );
    }
  }, [filterList]);

  useEffect(() => {
    dispatch(fetchRating());
  }, []);

  useEffect(() => {
    setAvatarURL(avatarURL);
  }, [avatarURL]);

  return (
    <>
      <div className="Profile" style={{ backgroundImage: `url(${Fone})` }}>
        <div className="Profile_Wrapper">
          <ProfileAvatar avatarUrl={avatarURL} />

          <ProfileInfo expires_at={expires_at} name={name} />
        </div>
      </div>

      <div className="Profile_Nav">
        <div className="Nav_List">
          <ul className="List">
            <ProfileMenuItem
              title="Overview"
              onMouseEnter={handleOverviewMouseEnter}
              onMouseLeave={handleOverviewMouseLeave}
              className="overview-item"
            >
              {showOverviewMenu && (
                <ProfileSubMenu>
                  <ProfileMenuItem title="Main" />
                  <ProfileMenuItem
                    title="Favourites"
                    onMouseEnter={handleFavoritesMouseEnter}
                    onMouseLeave={handleFavoritesMouseLeave}
                  >
                    {showFavoritesMenu && (
                      <ProfileSubMenu className="submenu-right">
                        <ProfileSubMenuItem
                          title="Movies"
                          onClick={() => setFilterList("favorites-movies")}
                          className="favorites-item"
                        />
                        <ProfileSubMenuItem
                          title="Series"
                          onClick={() => setFilterList("favorites-series")}
                          className="favorites-item"
                        />
                      </ProfileSubMenu>
                    )}
                    <AiFillCaretRight />
                  </ProfileMenuItem>
                  <ProfileSubMenuItem title="Recommendations" />
                  {!isGuest && <ProfileSubMenuItem title="Edit Profile" />}
                </ProfileSubMenu>
              )}
            </ProfileMenuItem>

            <ProfileMenuItem title="Lists" />
            <ProfileMenuItem
              title="Ratings"
              onClickRatings={() => setFilterList("ratings")}
            />

            <ProfileMenuItem
              title="Watchlist"
              onMouseEnter={handleWatchlistMouseEnter}
              onMouseLeave={handleWatchlistMouseLeave}
              className="watchlist-item"
            >
              {showWatchlistMenu && (
                <ProfileSubMenu className="submenuWatchList">
                  <ProfileSubMenuItem
                    title="Movies"
                    onClick={() => setFilterList("watchlist-movies")}
                  />
                  <ProfileSubMenuItem
                    title="Series"
                    onClick={() => setFilterList("watchlist-series")}
                  />
                </ProfileSubMenu>
              )}
              <AiFillCaretDown />
            </ProfileMenuItem>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
