import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

interface IOwnProps {
  name: string | null;
  postReviews: (textReviews: string) => void;
}

const ReviewsInput: React.FC<IOwnProps> = ({ name, postReviews }) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const postComment = () => {
    postReviews(textAreaValue);
    setTextAreaValue("");
  };
  return (
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
      </div>
    </div>
  );
};

export default ReviewsInput;
