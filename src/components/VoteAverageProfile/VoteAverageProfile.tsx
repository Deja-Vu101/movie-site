import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IOwnProps {
  voteAverage?: number;
}
const VoteAverageProfile: React.FC<IOwnProps> = ({ voteAverage }) => {
  const { results } = useTypedSelector((state) => state.rating);

  function calculateAverage(numbersArray: number[]) {
    if (numbersArray.length === 0) {
      return 0;
    }

    const sum = numbersArray.reduce((total, number) => total + number, 0);
    const average = sum / numbersArray.length;
    return average;
  }
  const valuesArray = results.map((item) => item.rating);
  const averageValue = calculateAverage(valuesArray);

  return (
    <div className="Vote">
      <CircularProgress
        value={voteAverage === 0 ? (0 / 10) * 100 : (averageValue / 10) * 100}
        color={"green"}
      >
        <CircularProgressLabel>
          <span className="ProgresLabel_Number">
            {voteAverage === 0
              ? voteAverage
              : averageValue === 0.0
              ? 0
              : averageValue.toFixed(1)}
          </span>
        </CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default VoteAverageProfile;
