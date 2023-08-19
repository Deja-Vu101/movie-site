import { imgBaseUrl } from "../../../apiConfigs/tmdb";
import "../poster.style.scss";
import PosterNotFound from "../../../assets/img/posterNotFound.png";
import PosterHover from "../PosterHover";

interface IOwnProps {
  id: number;
  poster: string | null;
  title: string;
  mediaType: string;
  voteAverage: number;
  year: string;
}

const FilmPoster: React.FC<IOwnProps> = ({
  id,
  poster,
  title,
  mediaType,
  voteAverage,
  year,
}) => {
  return (
    <div className="FilmPoster">
      <img
        className="Poster_Image"
        src={poster !== null ? imgBaseUrl + poster : PosterNotFound}
        alt="Movie Poster"
      />
      {mediaType === 'person' }
      <PosterHover
        ItemName={title}
        id={id}
        mediaType={mediaType}
        voteAverage={voteAverage}
        year={year}
      />
    </div>
  );
};

export default FilmPoster;
