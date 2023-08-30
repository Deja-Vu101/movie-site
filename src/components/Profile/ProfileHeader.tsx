import { useState, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Fone from "../../assets/img/fone1.png";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useNavigate } from "react-router-dom";
import { fetchFavoriteList } from "../../store/slices/favoriteSlice";
import { fetchWatchList } from "../../store/slices/watchListSlice";
import VoteAverageProfile from "../VoteAverageProfile/VoteAverageProfile";
import { fetchRating } from "../../store/slices/ratingSlice";
import FormatReleaseDate from "../FormatReleaseDate";
import { TbEdit } from "react-icons/tb";
import Modal from "react-modal";
import AvatarEditor from "./AvatarEditor";
import { setUserAvatar } from "../../store/slices/userSlice";
import ProfileEdit from "./ProfileEdit/ProfileEdit";

//const { results } = useTypedSelector((state) => state.rating);

const ProfileHeader = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [filterList, setFilterList] = useState("");

  const [showFavoritesMenu, setShowFavoritesMenu] = useState(false);
  const { name, createDate, avatarURL } = useTypedSelector(
    (state) => state.user
  );

  const [avatarUrl, setAvatarURL] = useState(avatarURL);

  useEffect(() => {
    setAvatarURL(avatarURL);
  }, [avatarURL]);

  const [showOverviewMenu, setShowOverviewMenu] = useState(false);

  const [showWatchlistMenu, setShowWatchlistMenu] = useState(false);

  useEffect(() => {
    if (filterList === "favorites-movies") {
      navigate("/profile/favorite/movies");
      dispatch(fetchFavoriteList("movies"));
    } else if (filterList === "favorites-series") {
      navigate("/profile/favorite/series");
      dispatch(fetchFavoriteList("tv"));
    } else if (filterList === "watchlist-movies") {
      navigate("/profile/watchlist/movies");
      dispatch(fetchWatchList("movies"));
    } else if (filterList === "watchlist-series") {
      navigate("/profile/watchlist/series");
      dispatch(fetchWatchList("tv"));
    }
  }, [filterList]);

  useEffect(() => {
    dispatch(fetchRating());
  }, []);

  return (
    <>
      <div
        className="Profile"
        style={{ height: "230px", backgroundImage: `url(${Fone})` }}
      >
        <div className="Profile_Wrapper">
          <div className="Profile_Avatar" style={{ display: "flex" }}>
            <img
              className="Avatar_Img"
              src={
                avatarUrl !== "" && avatarUrl
                  ? avatarUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
              }
              //src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
              alt="EmptyProfile"
            />
          </div>

          {/*<Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Avatar Modal"
            style={{
              content: { backgroundColor: "black" },
              overlay: { zIndex: "1000" },
            }}
          >*/}
          {/*<ProfileEdit
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            openModal={openModal}
          />*/}
          {/*</Modal>*/}

          <div className="Profile_Description">
            <div className="Profile_DescriptionFlex">
              <div className="Profile_Name">
                {name}
                <span className="Profile_MemberSince">
                  Member since {"  "}
                  <span>
                    <FormatReleaseDate release={1693254110356} />
                  </span>
                </span>
              </div>
              <div className="Profile_Statistik">
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <VoteAverageProfile />
                  Average <br /> Movie Score
                </div>

                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <VoteAverageProfile voteAverage={0} />
                  Average <br /> TV Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Profile_Nav">
        <div className="Nav_List">
          <ul className="List">
            <li
              className="overview-item"
              onMouseEnter={() => setShowOverviewMenu(true)}
              onMouseLeave={() => setShowOverviewMenu(false)}
            >
              Overview <AiOutlineCaretDown />
              {showOverviewMenu && (
                <ul className="submenu">
                  <li>Main</li>
                  <li
                    className="favorites-item"
                    onMouseEnter={() => setShowFavoritesMenu(true)}
                    onMouseLeave={() => setShowFavoritesMenu(false)}
                  >
                    Favorites <AiFillCaretRight />
                  </li>
                  <li>Recommendations</li>
                  <li className="submenuLastChild">Edit Profile</li>
                  {showFavoritesMenu && (
                    <ul
                      className="submenu submenu-right"
                      onMouseEnter={() => setShowFavoritesMenu(true)}
                      onMouseLeave={() => setShowFavoritesMenu(false)}
                    >
                      <ul>
                        <li onClick={() => setFilterList("favorites-movies")}>
                          Movies
                        </li>
                        <li onClick={() => setFilterList("favorites-series")}>
                          Series
                        </li>
                      </ul>
                    </ul>
                  )}
                </ul>
              )}
            </li>
            <li>Lists</li>
            <li>Ratings</li>
            <li
              className="watchlist-item"
              onMouseEnter={() => setShowWatchlistMenu(true)}
              onMouseLeave={() => setShowWatchlistMenu(false)}
            >
              Watchlist <AiOutlineCaretDown />
              {showWatchlistMenu && (
                <ul className="submenuWatchList">
                  <li onClick={() => setFilterList("watchlist-movies")}>
                    Movies
                  </li>
                  <li onClick={() => setFilterList("watchlist-series")}>
                    Series
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
