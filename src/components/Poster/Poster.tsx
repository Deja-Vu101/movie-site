import { imgBaseUrl } from "../../apiConfigs/tmdb";
import "./poster.style.scss";
import PosterNotFound from "../../assets/img/posterNotFound.png";

interface IOwnProps {
  id: number;
  poster: string | null;
}

const Poster: React.FC<IOwnProps> = ({ id, poster }) => {
  return (
    <div className="Poster">
      {poster !== null ? (
        <img
          className="Poster_Image"
          src={imgBaseUrl + poster}
          alt="Movie Poster"
        />
      ) : (
        <img
          className="Poster_Image"
          src={PosterNotFound}
          alt="Movie Poster"
        />
      )}
    </div>
  );
};

export default Poster;
