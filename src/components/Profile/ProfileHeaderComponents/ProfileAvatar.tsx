import React from "react";

interface IOwnProps {
  avatarUrl: string;
}

const ProfileAvatar: React.FC<IOwnProps> = ({ avatarUrl }) => {
  return (
    <div className="Profile_Avatar">
      <img
        className="Avatar_Img"
        src={
          avatarUrl !== "" && avatarUrl
            ? avatarUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
        }
        alt="EmptyProfile"
      />
    </div>
  );
};

export default ProfileAvatar;
