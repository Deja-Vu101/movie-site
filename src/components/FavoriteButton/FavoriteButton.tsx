import { AiFillHeart } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import React from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addToFavoritelist,
  removeItemFavorite,
  removeItemBlacklist,
  fetchFavoriteList,
} from "../../store/slices/favoriteSlice";

interface IOwnProps {
  id: number;
  title?: string;
}
const FavoriteButton: React.FC<IOwnProps> = ({ id, title }) => {
  const dispatch = useTypedDispatch();
  const { results, removedItem } = useTypedSelector(
    (state) => state.favoriteList
  );

  const isFavorite =
    results.some((item) => item.id === id) && !removedItem.includes(id);

  const handlerLike = () => {
    isFavorite
      ? dispatch(removeItemFavorite(id))
      : dispatch(addToFavoritelist({ id, mediaType: "movie" }))
          .then((resultAction) => {
            if (addToFavoritelist.fulfilled.match(resultAction)) {
              dispatch(removeItemBlacklist(id));
            }
          })
          .then(() => dispatch(fetchFavoriteList()));
  };

  return (
    <div className="Button" onClick={handlerLike}>
      <div
        style={{
          color: isFavorite ? "red" : "white",
          width: "inherit",
        }}
      >
        <AiFillHeart /> <span style={{ color: "white" }}>{title}</span>
      </div>
    </div>
  );
};

export default FavoriteButton;
