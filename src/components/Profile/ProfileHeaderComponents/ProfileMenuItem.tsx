import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

interface IOwnProps {
  title: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: any;
  onClickRatings?: () => void;
  className?: string;
}

const ProfileMenuItem: React.FC<IOwnProps> = ({
  title,
  onMouseEnter,
  onMouseLeave,
  children,
  onClickRatings,
  className,
}) => {
  return (
    <li
      //className={`overview-item ${title.toLowerCase()}-item`}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickRatings}
    >
      {title} {title === "Overview" && <AiOutlineCaretDown />} {children}
    </li>
  );
};

export default ProfileMenuItem;
