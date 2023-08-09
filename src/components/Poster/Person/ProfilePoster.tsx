
import { imgBaseUrl } from "../../../apiConfigs/tmdb";
import "../poster.style.scss";
import PosterNotFound from "../../../assets/img/posterNotFound.png";

interface IOwnProps {
    id: number;
    posterProfile: string | null;
}

const ProfilePoster: React.FC<IOwnProps> = ({ id, posterProfile }) => {
    return (
        <div className="Poster">
            {posterProfile !== null ? (
                <img
                    className="Poster_Image"
                    src={imgBaseUrl + posterProfile}
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

export default ProfilePoster;