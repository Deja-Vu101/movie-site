import { HiMiniPlay } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface IOwnProps {
  mediaType?: string;
  id?: string | number;
}

const WatchNowBtn: React.FC<IOwnProps> = ({ id, mediaType }) => {
  const navigate = useNavigate();

  const navigateToMediaPage = () => {
    if (id && mediaType) {
      navigate(`/${mediaType}/${id}`);
    }
  };
  return (
    <div className="btn_WatchNow" onClick={navigateToMediaPage}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "5px",
        }}
      >
        <HiMiniPlay />
      </span>
      Watch now
    </div>
  );
};

export default WatchNowBtn;
