import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface IOwnProps {
  voteAverage: number;
}
const VoteAverage: React.FC<IOwnProps> = ({ voteAverage }) => {
  return (
    <div className="Vote" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress value={voteAverage / 10 * 100} color={'green'}>
        <CircularProgressLabel style={{fontSize: '15px', marginTop: '-4px'}}>{voteAverage.toFixed(1)}</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default VoteAverage;
