import { AiFillHeart } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import React from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addToFavoritelist,
  fetchFavoriteList,
  deleteFavoriteItem,
} from "../../store/slices/favoriteSlice";
import { AppDispatch } from "../../store";

interface IOwnProps {
  id: number;
  title?: string;
  mediaType: "movie" | "tv";
}
const FavoriteButton: React.FC<IOwnProps> = ({ id, title, mediaType }) => {
  const dispatch = useTypedDispatch();
  const { results } = useTypedSelector((state) => state.favoriteList);

  const isFavorite = results.some((item) => item.id === id);

  const handlerLike = async (dispatch: AppDispatch) => {
    isFavorite
      ? await dispatch(deleteFavoriteItem({ id: id, mediaType: mediaType }))
      : await dispatch(addToFavoritelist({ id: id, mediaType: mediaType }));
    dispatch(fetchFavoriteList());
  };

  return (
    <div className="Button" onClick={() => handlerLike(dispatch)}>
      <div
        className="FavoriteButton"
        style={{
          color: isFavorite ? "red" : "white",
        }}
      >
        <AiFillHeart />

        <span className="Button_Name">{title}</span>
      </div>
    </div>
  );
};

export default FavoriteButton;
