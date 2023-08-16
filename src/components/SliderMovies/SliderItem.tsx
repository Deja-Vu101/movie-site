import { imgBaseUrl } from "../../apiConfigs/tmdb";
import { HiMiniPlay } from "react-icons/hi2";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
//import { RiPlayListAddFill } from "react-icons/ri";
import VoteAverage from "../Trending/VoteAverage";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addToWatchlist,
  removeItemBlacklist,
} from "../../store/slices/watchListSlice";
import { addToFavouritelist } from "../../store/slices/favouriteList";

interface IOwnProps {
  id: number;
  poster: string;
  voteAverage: number;
  year: string;
  ItemName: string;
  mediaType: string;
}

const SliderItem: React.FC<IOwnProps> = ({
  id,
  poster,
  voteAverage,
  year,
  ItemName,
  mediaType,
}) => {
  const dispatch = useTypedDispatch();

  const saveToPlaylist = (id: number) => {
    dispatch(addToWatchlist({ id, mediaType: mediaType })).then(
      (resultAction) => {
        if (addToWatchlist.fulfilled.match(resultAction)) {
          dispatch(removeItemBlacklist(id));
        }
      }
    );
  };

  const saveToFavouritelist = (id: number) => {
    dispatch(addToFavouritelist({ id, mediaType: "movie" }));
  };

  return (
    <div className="SliderItem">
      <div className="SliderItem_Container">
        <img
          className="SliderItem_Image"
          src={imgBaseUrl + poster}
          alt="Movie Poster"
        />

        <div className="SliderItem_Hover">
          <div className="SliderItem_Icon">
            <HiMiniPlay />
          </div>
          <div className="Description_Poster">
            <VoteAverage voteAverage={voteAverage} />
            <div>{year}</div>
            <div>{ItemName}</div>
            <div
              className="SaveItem_Playlist"
              onClick={() => saveToPlaylist(id)}
            >
              <BsFillBookmarksFill />
            </div>
            <div
              className="SaveItem_Playlist"
              onClick={() => saveToFavouritelist(id)}
            >
              <AiFillHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
