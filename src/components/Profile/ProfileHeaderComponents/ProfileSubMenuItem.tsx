import React from "react";

interface IOwnProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

const ProfileSubMenuItem: React.FC<IOwnProps> = ({
  onClick,
  title,
  className,
}) => {
  return (
    <li className={className} onClick={onClick}>
      {title}
    </li>
  );
};

export default ProfileSubMenuItem;
