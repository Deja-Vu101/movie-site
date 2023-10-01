import React from "react";
import GenresList from "../Genres/GenresList";
import { HiMiniPlay } from "react-icons/hi2";
import VoteAverage from "./VoteAverage";
import WatchNowBtn from "../WatchNowBtn";

interface IOwnProps {
  url: string;
  title?: string;
  overview: string;
  genres: number[];
  voteAverage: number;
  mediaType: string;
  id: number;
}
const CardsItem: React.FC<IOwnProps> = ({
  url,
  title,
  overview,
  genres,
  voteAverage,
  mediaType,
  id,
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
            <div className="Overview">
              {overview.length > 200
                ? overview.slice(0, 200) + "..."
                : overview}
            </div>
              <WatchNowBtn id={id.toString()} mediaType={mediaType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
