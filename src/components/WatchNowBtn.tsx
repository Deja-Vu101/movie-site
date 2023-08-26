import { HiMiniPlay } from "react-icons/hi2";

const WatchNowBtn = () => {
  return (
    <div className="btn_WatchNow">
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
