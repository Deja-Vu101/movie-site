import { imgBaseUrl } from "../../apiConfigs/tmdb";
import PosterHover from "../Poster/PosterHover";
//import PosterNotFound from "../../assets/img/notfound.jpg";
import PosterNotFound from "../../assets/img/404MosterNotFound.jpg";

interface IOwnProps {
  id: number;
  poster?: string;
  voteAverage: number;
  year: string;
  ItemName: string;
  mediaType: string;
}

const SliderItem: React.FC<IOwnProps> = ({
  id,
  poster,
  voteAverage,
  year,
  ItemName,
  mediaType,
}) => {
  return (
    <div className="SliderItem">
      <div className="SliderItem_Container">
        <img
          className="SliderItem_Image"
          src={poster !== null ? imgBaseUrl + poster : PosterNotFound}
          alt="Movie Poster"
        />
        <PosterHover
          mediaType={mediaType}
          voteAverage={voteAverage}
          ItemName={ItemName}
          id={id}
          year={year}
        />
      </div>
    </div>
  );
};

export default SliderItem;
