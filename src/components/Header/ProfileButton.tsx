import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NavLink } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";

const ProfileButton = () => {
  const dispatch = useTypedDispatch();
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
        <div className="DropdownMenu" style={{ width: dropdownWidth }}>
          <ul className="DropdownMenu_List">
            <NavLink className={"List_Item"} to={"/profile"}>
              View profile
            </NavLink>

            <NavLink className={"List_Item"} to={"/profile/favorite/movies"}>
              Favorite
            </NavLink>

            <NavLink className={"List_Item"} to={"/profile/watchlist/movies"}>
              Watchlist
            </NavLink>

            {!isGuest && (
              <NavLink className={"List_Item"} to={"/profile/edit"}>
                Edit profile
              </NavLink>
            )}

            <li onClick={() => dispatch(logout())}>
              <span>{isGuest ? "Login" : "Logout"}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
