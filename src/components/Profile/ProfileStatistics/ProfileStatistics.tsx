import VoteAverageProfile from "../../VoteAverageProfile/VoteAverageProfile";
import "./profile-statistics.scss";

const ProfileStatistics = () => {
  return (
    <div className="Profile_Statistics">
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <VoteAverageProfile />
        Average <br /> Movie Score
      </div>

      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <VoteAverageProfile voteAverage={0} />
        Average <br /> TV Score
      </div>
    </div>
  );
};

export default ProfileStatistics;
