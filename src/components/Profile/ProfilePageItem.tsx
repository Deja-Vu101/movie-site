import { imgBaseUrl } from "../../apiConfigs/tmdb";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { removeItemWatchlist } from "../../store/slices/watchListSlice";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import FormatReleaseDate from "../FormatReleaseDate";
import VoteAverage from "../Trending/VoteAverage";
import "./profile.scss";
import { GiCancel } from "react-icons/gi";
import RatingSection from "../Rating/Rating";
import { useState, useEffect } from "react";

interface IOwnProps {
  poster: string;
  voteAverage: number;
  title: string;
  release: string;
  overview: string;
  id: number;
}

const ProfilePageItem: React.FC<IOwnProps> = ({
  poster,
  voteAverage,
  title,
  release,
  overview,
  id,
}) => {
  const dispatch = useTypedDispatch();

  const removeItem = (id: number) => {
    dispatch(removeItemWatchlist(id));
  };

  return (
    <div className="ProfilePage_Item">
      <div className="ProfilePage_ItemWrapper">
        <div className="ItemPoster">
          <img
            className="ItemPoster_Img"
            src={imgBaseUrl + poster}
            alt="Poster"
          />
        </div>

        <div className="ItemBody">
          <div className="ItemBody_Header">
            <div className="Vote_Average">
              <VoteAverage voteAverage={voteAverage} />
            </div>

            <div className="TitleAndRelease">
              <span className="Item_Title">{title}</span>
              <div className="Item_Release">
                <FormatReleaseDate release={release} />
              </div>
            </div>
          </div>

          <div className="Item_Captions">
            <div className="TextWrapper">
              <span className="Item_Captions">{overview}</span>
              <span className="Ellipsis">...</span>
            </div>
          </div>

          <div className="Item_Buttons Main_Item_Buttons">
            <div className="Button">
              <RatingSection movieID={id.toString()} /> Your rating
            </div>

            <FavoriteButton id={id} title="Favorite" mediaType="" />

            <div className="Button" onClick={() => removeItem(id)}>
              <GiCancel />
              Remove
            </div>
          </div>
        </div>
      </div>
      <div className="Item_Buttons Adaptive_Item_Buttons">
        <div className="Button">
          <RatingSection movieID={id.toString()} />{" "}
          <span className="Button_Name">Your rating</span>
        </div>

        <FavoriteButton id={id} title="Favorite" mediaType="" />

        <div className="Button" onClick={() => removeItem(id)}>
          <GiCancel />
          <span className="Button_Name">Remove</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageItem;
