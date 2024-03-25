import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import FormatReleaseDate from "../../FormatReleaseDate";
import ProfileStatistics from "../ProfileStatistics/ProfileStatistics";

interface IOwnProps {
  name: string | null;
  expires_at: string | null;
}

const ProfileInfo: React.FC<IOwnProps> = ({ name, expires_at }) => {
  const { isGuest } = useAuth();
  return (
    <div className="Profile_Description">
      <div className="Profile_DescriptionFlex">
        <div className="Profile_Name">
          <span className="Name">{isGuest ? "Guest" : name}</span>
          <span className="Profile_MemberSince">
            {isGuest ? (
              "The session will be deactivated on " + expires_at
            ) : (
              <>
                Member since
                <FormatReleaseDate release={1693254110356} />
              </>
            )}
          </span>
        </div>

        <ProfileStatistics />
      </div>
    </div>
  );
};

export default ProfileInfo;
