import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import HeaderDropDownMenu from "./HeaderDropDownMenu";

const ProfileButton = () => {
  const { name, isGuest } = useAuth();
  const [visibleHeaderMenu, setVisibleHeaderMenu] = useState(true);
  const headerProfileRef = useRef<HTMLDivElement | null>(null);
  const { avatarURL } = useTypedSelector((state) => state.user);

  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    if (headerProfileRef.current) {
      const width = headerProfileRef.current.offsetWidth;
      setDropdownWidth(width);
    }
  }, []);

  return (
    <div
      className="Header_Profile"
      onClick={() => setVisibleHeaderMenu(!visibleHeaderMenu)}
      ref={headerProfileRef}
    >
      <div className="Image_Profile">
        <img
          className="ProfileImg"
          src={
            !isGuest && avatarURL
              ? avatarURL
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
          }
        />
      </div>
      <div>{isGuest ? "Guest" : name}</div>
      {visibleHeaderMenu && (
        <HeaderDropDownMenu dropdownWidth={dropdownWidth} />
      )}
    </div>
  );
};

export default ProfileButton;
