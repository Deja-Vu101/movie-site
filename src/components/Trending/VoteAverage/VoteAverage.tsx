import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import "./style.scss";

interface IOwnProps {
  voteAverage: number;
}
const VoteAverage: React.FC<IOwnProps> = ({ voteAverage }) => {
  return (
    <div className="Vote">
      <CircularProgress value={(voteAverage / 10) * 100} color={"green"}>
        <div className="CircularProgressLabel">
          <CircularProgressLabel fontSize={"14px"} marginTop={"-3px"}>
            {voteAverage.toFixed(1)}
          </CircularProgressLabel>
        </div>
      </CircularProgress>
    </div>
  );
};

export default VoteAverage;
