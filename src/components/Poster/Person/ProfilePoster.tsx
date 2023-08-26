import { imgBaseUrl } from "../../../apiConfigs/tmdb";
import "../poster.style.scss";
import PosterNotFound from "../../../assets/img/posterNotFound.png";

interface IOwnProps {
  id: number;
  posterProfile: null | string;
  name: string;
}

const ProfilePoster: React.FC<IOwnProps> = ({ id, posterProfile, name }) => {
  return (
    <div className="Poster">
      <img
        className="Poster_Image"
        src={
          posterProfile !== null ? imgBaseUrl + posterProfile : PosterNotFound
        }
        alt="Person Poster"
      />
      <div className="ProfileHover">{name}</div>
    </div>
  );
};

export default ProfilePoster;
