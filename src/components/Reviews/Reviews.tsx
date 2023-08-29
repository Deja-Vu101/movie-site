import { IReviews, IReviewsFirebase } from "../../globalTypes/globalTypes";
import { BsFillSendFill } from "react-icons/bs";
import ReviewItem from "./ReviewItem";
import "./reviews.scss";
import { useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { v4 as uuidv4 } from "uuid";
import { addReviews, fetchReviews } from "../../store/slices/reviewsSlice";
import { useEffect } from "react";

interface IOwnProps {
  reviews: (IReviewsFirebase | IReviews)[];
  movieId: string | undefined;
  handlePost: boolean;
  setHandlePost: (handlePost: boolean) => void;
  reviewsFirebase: IReviewsFirebase[];
}

const Reviews: React.FC<IOwnProps> = ({
  reviews,
  movieId,
  reviewsFirebase,
}) => {
  const dispatch = useTypedDispatch();
  const {
    id: idUser,
    name,
    avatarURL,
  } = useTypedSelector((state) => state.user);

  const [textAreaValue, setTextAreaValue] = useState("");

  const postReviews = () => {
    if (name && idUser !== null && movieId) {
      const uniqueId = uuidv4();
      const newReview: IReviewsFirebase = {
        author: name,
        authorUrl: avatarURL,
        content: textAreaValue,
        created_at: Date.now().toString(),
        idReview: uniqueId,
        idUser: idUser,
        idMovie: movieId,
      };
      dispatch(addReviews(newReview));
      setTextAreaValue("");
    }
  };
  const totalReviews =
    reviews.length +
    reviewsFirebase.filter((i) => i.idMovie === movieId).length;
  return (
    <div className="Reviews">
      <div className="Reviews_Container">
        <div className="Collection_Title">Reviews {totalReviews}</div>
        <div className="Title_Decoration"></div>

        {reviews.map((i) => (
          <ReviewItem
            key={i.content}
            name={i.author}
            content={i.content}
            created_at={i.created_at}
            idReview={i.idReview}
            idUser={i.idUser}
            movieId={movieId}
          />
        ))}

        {reviewsFirebase.map((i) =>
          i.idMovie === movieId ? (
            <ReviewItem
              key={i.content}
              name={i.author}
              content={i.content}
              created_at={Number(i.created_at)}
              idReview={i.idReview}
              idUser={i.idUser}
              movieId={movieId}
              avatar={i.authorUrl}
            />
          ) : null
        )}
        <div className="line"></div>
        <div className="Reviews_InputWrapper">
          <div className="Reviews_AuthorImg">
            {/*{name?.toLowerCase()?.slice(0, 1)}*/}
            <img
              className="Reviews_Img"
              src={
                avatarURL !== "" && avatarURL
                  ? avatarURL
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
              }
              alt="Avatar revie"
            />
          </div>
          <div className="Reviews_Input">
            <div className="Reviews_Body">
              <div className="Reviews_Name">{name}</div>
              <div className="ReviewsArea">
                <textarea
                  className="Area"
                  placeholder="Write your review"
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                ></textarea>
              </div>
              <div className="PostBtn" onClick={postReviews}>
                <div>
                  <BsFillSendFill />
                </div>
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
