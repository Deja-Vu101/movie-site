import { IReviews, IReviewsFirebase } from "../../globalTypes/globalTypes";
import ReviewItem from "./ReviewItem";
import "./reviews.scss";
import { useEffect, useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { v4 as uuidv4 } from "uuid";
import { addReviews } from "../../store/slices/reviewsSlice";
import ReviewsInput from "./ReviewsInput";
import { getDownloadURL, getStorage, listAll, ref } from "@firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface IOwnProps {
  reviews: (IReviewsFirebase | IReviews)[];
  movieId: string | undefined;
  handlePost: boolean;
  setHandlePost: (handlePost: boolean) => void;
  reviewsFirebase: IReviewsFirebase[];
  mediaType: string;
}

const Reviews: React.FC<IOwnProps> = ({
  reviews,
  movieId,
  reviewsFirebase,
  mediaType,
}) => {
  const dispatch = useTypedDispatch();
  const {
    id: idUser,
    name,
    avatarURL,
  } = useTypedSelector((state) => state.user);
  const auth = getAuth();

  const [avatarsUser, setAvatarsUser] = useState<
    { avatarUrl: string; avatarName: string }[]
  >([]);

  const postReviews = (textReviews: string) => {
    if (name && idUser !== null && movieId) {
      const uniqueId = uuidv4();
      const newReview: IReviewsFirebase = {
        author: name,
        authorUrl: avatarURL,
        content: textReviews,
        created_at: Date.now().toString(),
        idReview: uniqueId,
        idUser: idUser,
        idMovie: movieId,
      };
      dispatch(addReviews(newReview));
    }
  };
  const totalReviews =
    reviews.length +
    reviewsFirebase.filter((i) => i.idMovie === movieId).length;

  useEffect(() => {
    const fetchAvatars = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/`);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const avatarsList = await listAll(storageRef);

            const avatarObjects = await Promise.all(
              avatarsList.items.map(async (avatarItem) => {
                const avatarUrl = await getDownloadURL(avatarItem);
                return {
                  avatarUrl,
                  avatarName: avatarItem.name,
                };
              })
            );
            setAvatarsUser(avatarObjects);
          } catch (error: any) {
            console.error("Error getting file names:", error.message);
          }
        } else {
          console.log("User is not authenticated");
        }
      });
    };
    fetchAvatars();
  }, [auth]);

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
            mediaType={mediaType}
            avatarsUser={avatarsUser}
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
              mediaType={mediaType}
              avatarsUser={avatarsUser}
            />
          ) : null
        )}
        <div className="line"></div>
        <div className="Reviews_InputWrapper">
          <div className="Reviews_AuthorImg">
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

          <ReviewsInput postReviews={postReviews} name={name} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
