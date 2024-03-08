import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { RiLoginBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface IOwnProps {
  name: string | null;
  postReviews: (textReviews: string) => void;
}

const ReviewsInput: React.FC<IOwnProps> = ({ name, postReviews }) => {
  const navigate = useNavigate();
  const [textAreaValue, setTextAreaValue] = useState("");
  const isGuest = name === null;

  const postComment = () => {
    postReviews(textAreaValue);
    setTextAreaValue("");
  };

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="Reviews_Input">
      <div className="Reviews_Body">
        <div className="Reviews_Name">{isGuest && "Guest"}</div>
        <div className="ReviewsArea">
          <textarea
            style={isGuest ? { cursor: "not-allowed" } : {}}
            className="Area"
            placeholder="Write your review"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            readOnly={isGuest && true}
          ></textarea>
        </div>

        {isGuest ? (
          <button
            className="PostBtn LoginBtnReview"
            onClick={navigateToLoginPage}
          >
            <div>
              <RiLoginBoxFill />
            </div>
            Sign in to leave a review
          </button>
        ) : (
          <button
            className="PostBtn"
            onClick={postComment}
            disabled={textAreaValue.split(" ").join("") === ""}
          >
            <div>
              <BsFillSendFill />
            </div>
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsInput;
