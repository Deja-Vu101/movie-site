import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Rating from "@mui/material/Rating";
import "./rating.scss";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { addRating, deleteRating } from "../../store/slices/ratingSlice";

interface IOwnProps {
  filmID: string;
  mediaType: string;
}

const RatingSection: React.FC<IOwnProps> = ({ filmID, mediaType }) => {
  const dispatch = useTypedDispatch();
  const { results } = useTypedSelector((state) => state.rating);
  const [isRating, setIsRating] = useState(false);
  const [ratedVideo, setRatedVideo] = useState<number | undefined>();
  const [showRating, setShowRating] = useState(false);

  const handleRatingChange = (event: any, newValue: any) => {
    dispatch(
      addRating({
        filmID: filmID,
        mediaType,
        newRating: newValue * 2,
      })
    );
    setRatedVideo(newValue * 2);

    setIsRating(true);

    setShowRating(false);
  };

  const toggleRating = () => {
    setShowRating(!showRating);
  };

  const isRatingFunc = () => {
    const ratedVideo = results.find((i) => i.id.toString() === filmID);

    setIsRating(ratedVideo !== undefined ? true : false);

    setRatedVideo(ratedVideo?.rating);
  };

  const deleteRatingFunc = () => {
    dispatch(deleteRating({ filmID: filmID, mediaType }));
    setRatedVideo(0.0);
    setIsRating(false);
    setShowRating(false);
  };

  useEffect(() => {
    isRatingFunc();
  }, [results, filmID]);

  return (
    <div className="star-rating-container">
      <div
        className="star-icon"
        style={
          isRating
            ? { color: "RGB(225, 158, 0)", fontSize: "25px" }
            : { fontSize: "25px" }
        }
        onClick={toggleRating}
      >
        <BsFillStarFill />
      </div>
      <div className={`rating-table ${showRating ? "visible" : ""}`}>
        {showRating ? (
          <div className="RatingWrapper">
            <span className="DeleteRating">
              <span onClick={deleteRatingFunc}>
                <FaMinusCircle />
              </span>
            </span>

            <Rating
              value={ratedVideo ? ratedVideo / 2 : null}
              precision={0.5}
              size="large"
              onChange={handleRatingChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RatingSection;
