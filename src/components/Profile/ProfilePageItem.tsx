import { imgBaseUrl } from "../../apiConfigs/tmdb";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { removeItemWatchlist } from "../../store/slices/watchListSlice";
import FormatReleaseDate from "../FormatReleaseDate";
import VoteAverage from "../Trending/VoteAverage";
import "./profile.scss";
import { AiFillStar } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

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

          <div className="Item_FlexEnd">
            <div className="Item_Captions">{overview}</div>
            <div className="Item_Buttons">
              <div className="Button">
                <AiFillStar /> Your rating
              </div>
              <div className="Button">
                <AiFillHeart />
                Favorite
              </div>
              <div className="Button" onClick={() => removeItem(id)}>
                <GiCancel />
                Remove
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageItem;
