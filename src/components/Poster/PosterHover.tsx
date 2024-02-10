import { HiMiniPlay } from "react-icons/hi2";
import VoteAverage from "../Trending/VoteAverage/VoteAverage";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useNavigate } from "react-router-dom";
import WatchListBtn from "../WatchListBtn/WatchListBtn";

interface IOwnProps {
  id: number;
  mediaType: string;
  voteAverage: number;
  year: string;
  ItemName: string;
}

const PosterHover: React.FC<IOwnProps> = ({
  mediaType,
  voteAverage,
  ItemName,
  id,
  year,
}) => {
  const dispatch = useTypedDispatch();

  const navigate = useNavigate();

  const navigateToMediaPage = () => {
    navigate(`/${mediaType}/${id}`);
  };
  return (
    <div className="SliderItem_Hover">
      <div className="SliderItem_Icon" onClick={navigateToMediaPage}>
        <HiMiniPlay />
      </div>

      <div className="Description_Poster">
        <div className="Description_VoteAverage">
          <VoteAverage voteAverage={voteAverage} />
        </div>
        <div className="Description_PosterWrapper">
          <div className="PosterHover_Year">{year}</div>
          <div className="PosterHover_Title" onClick={navigateToMediaPage}>
            {ItemName}
          </div>
          <div className="Poster_Button">
            <div className="Button">
              <FavoriteButton id={id} mediaType={mediaType} />
            </div>
            <WatchListBtn id={id} mediaType={mediaType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterHover;
