import VoteAverageProfile from "../../VoteAverageProfile/VoteAverageProfile";
import "./profile-statistics.scss";

const ProfileStatistics = () => {
  return (
    <div className="Profile_Statistics">
      <div>
        <VoteAverageProfile />
        Average <br /> Movie Score
      </div>

      <div>
        <VoteAverageProfile voteAverage={0} />
        Average <br /> TV Score
      </div>
    </div>
  );
};

export default ProfileStatistics;
