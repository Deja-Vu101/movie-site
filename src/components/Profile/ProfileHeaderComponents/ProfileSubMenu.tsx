import React from "react";

interface IOwnProps {
  children: any;
  className?: string;
}

const ProfileSubMenu: React.FC<IOwnProps> = ({ children, className }) => {
  return <ul className={`submenu ${className}`}>{children}</ul>;
};

export default ProfileSubMenu;
