import { HiMiniPlay } from "react-icons/hi2";
import { BsFillBookmarksFill } from "react-icons/bs";
import VoteAverage from "../Trending/VoteAverage";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addToWatchlist,
  fetchWatchList,
  removeItemBlacklist,
  removeItemWatchlist,
} from "../../store/slices/watchListSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IOwnProps {
  id: number;
  mediaType: string;
  voteAverage: number;
  year: string;
  ItemName: string;
}

const PosterHover: React.FC<IOwnProps> = ({
  mediaType,
  voteAverage,
  ItemName,
  id,
  year,
}) => {
  const dispatch = useTypedDispatch();
  const { results, removedItem } = useTypedSelector((state) => state.watchList);

  const isSave =
    results.some((item) => item.id === id) && !removedItem.includes(id);

  const saveToPlaylist = (id: number) => {
    isSave
      ? dispatch(removeItemWatchlist(id))
      : dispatch(addToWatchlist({ id, mediaType: mediaType }))
          .then((resultAction) => {
            if (addToWatchlist.fulfilled.match(resultAction)) {
              dispatch(removeItemBlacklist(id));
            }
          })
          .then(() => dispatch(fetchWatchList()));
  };

  return (
    <div className="SliderItem_Hover">
      <div className="SliderItem_Icon">
        <HiMiniPlay />
      </div>

      <div className="Description_Poster">
        <div style={{ width: "70px" }}>
          <VoteAverage voteAverage={voteAverage} />
        </div>
        <div className="Description_PosterWrapper">
          <div style={{ fontSize: "18px", marginTop: "16px" }}>{year}</div>
          <div style={{ fontWeight: "500", marginTop: "10px" }}>{ItemName}</div>
          <div className="Poster_Button">
            <div className="Button">
              <FavoriteButton id={id} />
            </div>
            <div
              className="Button"
              onClick={() => saveToPlaylist(id)}
              style={{ color: isSave ? "rgb(146, 0, 146)" : "white" }}
            >
              <BsFillBookmarksFill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterHover;
