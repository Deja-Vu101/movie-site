import React, { useEffect, useRef, useState } from "react";
import GenresList from "../Genres/GenresList";
import VoteAverage from "./VoteAverage/VoteAverage";
import WatchNowBtn from "../WatchNowBtn";

interface IOwnProps {
  url: string;
  title?: string;
  overview: string;
  genres: number[];
  voteAverage: number;
  mediaType: string;
  id: number;
  isVisible: any;
}
const CardsItem: React.FC<IOwnProps> = ({
  url,
  title,
  overview,
  genres,
  voteAverage,
  mediaType,
  id,
  isVisible,
}) => {
  return (
    <div className="CardsItem">
      <div className="CardsItem_Container">
        <img
          src={url}
          alt="background image"
          className="CardsItem_img"
          loading="lazy"
        />
        <div className="imgFilter"></div>
        <div className="CardsItem_CenterContainer">
          <div className="CardsItem_LeftContent">
            <div
              className={`CardsItem_MovieName ${isVisible ? "animated" : ""}`}
            >
              {title}
            </div>
            <div
              className={`CardsItem_Description ${isVisible ? "animated" : ""}`}
            >
              <VoteAverage voteAverage={voteAverage} />
              <GenresList genres={genres} mediaType={mediaType} />
            </div>
            <div className={`Overview ${isVisible ? "animated" : ""}`}>
              {overview.length > 200
                ? overview.slice(0, 200) + "..."
                : overview}
            </div>
            <div className={`CardsItem_Button ${isVisible ? "animated" : ""}`}>
              <WatchNowBtn id={id.toString()} mediaType={mediaType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
