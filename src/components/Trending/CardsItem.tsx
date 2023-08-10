import React from "react";
import GenresList from "../Genres/GenresList";
import { HiMiniPlay } from "react-icons/hi2";
import VoteAverage from "./VoteAverage";

interface IOwnProps {
  url: string;
  title?: string;
  overview: string;
  genres: number[];
  voteAverage: number;
  mediaType: string;
}
const CardsItem: React.FC<IOwnProps> = ({
  url,
  title,
  overview,
  genres,
  voteAverage,
  mediaType,
}) => {
  return (
    <div className="CardsItem">
      <div className="CardsItem_img" style={{ backgroundImage: `url(${url})` }}>
        <div className="CardsItem_CenterContainer">
          <div className="CardsItem_LeftContent">
            <div className="CardsItem_MovieName">{title}</div>
            <div className="CardsItem_Description">
              <VoteAverage voteAverage={voteAverage} />
              <GenresList genres={genres} mediaType={mediaType} />
            </div>
            <div className="Overview">{overview}</div>
            <div className="btn_WatchNow">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "5px",
                }}
              >
                <HiMiniPlay />
              </span>
              Watch now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
