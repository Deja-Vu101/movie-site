import { AiFillHeart } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import React, { useEffect } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addToFavoritelist,
  fetchFavoriteList,
  removeItemFavorite,
} from "../../store/slices/favoriteSlice";

interface IOwnProps {
  id: number;
  title?: string;
}

const FavoriteButton: React.FC<IOwnProps> = ({ id, title }) => {
  const dispatch = useTypedDispatch();
  const { results } = useTypedSelector((state) => state.favoriteList);

  const isFavorite = results.some((item) => item.id === id);

  const handlerLike = () => {
    isFavorite
      ? dispatch(removeItemFavorite(id))
      : dispatch(addToFavoritelist({ id, mediaType: "movie" }));
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
