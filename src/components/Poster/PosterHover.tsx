import { HiMiniPlay } from "react-icons/hi2";
import VoteAverage from "../Trending/VoteAverage";
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
  return (
    <div className="SliderItem_Hover">
      <div
        className="SliderItem_Icon"
        onClick={() => navigate(`/${mediaType}/${id}`)}
      >
        <HiMiniPlay />
      </div>

      <div className="Description_Poster">
        <div className="Description_VoteAverage" style={{ width: "70px" }}>
          <VoteAverage voteAverage={voteAverage} />
        </div>
        <div className="Description_PosterWrapper">
          <div style={{ fontSize: "18px", marginTop: "16px" }}>{year}</div>
          <div style={{ fontWeight: "500", marginTop: "10px" }}>{ItemName}</div>
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
