import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { deleteReviews, fetchReviews } from "../../store/slices/reviewsSlice";
import { useState } from "react";
import ReviewsDateCreate from "../FormatCreateAtData";

interface IOwnProps {
  name: string;
  content: string;
  created_at: string | number;
  idUser: string;
  idReview: string;
  movieId: string | undefined;

  mediaType: string;
  avatarsUser: { avatarUrl: string; avatarName: string }[];
}

const ReviewItem: React.FC<IOwnProps> = ({
  content,
  created_at,
  name,
  idReview,
  idUser,
  movieId,
  mediaType,
  avatarsUser,
}) => {
  const dispatch = useTypedDispatch();
  const { id } = useTypedSelector((state) => state.user);
  const [isHidden, setIsHidden] = useState(true);

  const avatarObject = avatarsUser.find((item) => item.avatarName === idUser);
  const avatarUrl = avatarObject ? avatarObject.avatarUrl : undefined;

  const onClickDeleteReviews = () => {
    if (movieId) {
      dispatch(deleteReviews({ movieID: movieId, reviewID: idReview })).then(
        (resultAction) => {
          if (deleteReviews.fulfilled.match(resultAction)) {
            dispatch(fetchReviews({ id: movieId, mediaType }));
          }
        }
      );
    }
  };

  return (
    <div className="Reviews_Wrapper">
      <div className="Reviews_AuthorImg">
        <img
          className="Reviews_Img"
          src={
            avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
          }
          alt="Avatar reviewer"
        />
      </div>
      <div className="Reviews_Body">
        <div className="Reviews_Name">{name}</div>
        <div className="Reviews_Date">
          <ReviewsDateCreate created_at={created_at} />
        </div>
        <div className="Reviews_Flex">
          <div className="Reviews_Content">
            {content?.length > 260 ? (
              <span
                className="Reviews_Text"
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? content?.slice(0, 200) + "..." : content}

                <span className="Reviews_LoadMore">
                  {isHidden ? <MdExpandMore /> : <MdExpandLess />}
                </span>
              </span>
            ) : (
              <span className="Content">{content}</span>
            )}

            {idUser === id ? (
              <div className="Reviews_Buttons">
                <div className="Button_Delete" onClick={onClickDeleteReviews}>
                  <span>
                    <AiFillDelete />
                  </span>
                  <div className="Button_Delete_Text">Delete</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
