import { BsFillBookmarksFill } from "react-icons/bs";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  addToWatchlist,
  fetchWatchList,
  removeItemBlacklist,
  removeItemWatchlist,
} from "../../store/slices/watchListSlice";
interface IOwnProps {
  id: number;
  title?: string;
  mediaType: string;
}

const WatchListBtn: React.FC<IOwnProps> = ({ id, mediaType }) => {
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
          .then(() =>
            dispatch(
              fetchWatchList(
                mediaType === "movie" ? mediaType + "s" : mediaType
              )
            )
          );
  };

  return (
    <div
      className="Button"
      onClick={() => saveToPlaylist(id)}
      style={{ color: isSave ? "rgb(146, 0, 146)" : "white" }}
    >
      <BsFillBookmarksFill />
    </div>
  );
};

export default WatchListBtn;
