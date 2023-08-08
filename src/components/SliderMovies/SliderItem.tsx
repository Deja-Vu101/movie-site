import { imgBaseUrl } from "../../apiConfigs/tmdb";

interface IOwnProps {
  id: number;
  poster: string;
}

const SliderItem: React.FC<IOwnProps> = ({ id, poster }) => {
  return (
    <div className="SliderItem">
      <img
        className="SliderItem_Image"
        src={imgBaseUrl + "/original" + poster}
        alt="Movie Poster"
      />
    </div>
  );
};

export default SliderItem;
