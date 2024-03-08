import React from "react";
import { NavLink } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

interface IOwnProps {
  dropdownWidth: number;
}

const HeaderDropDownMenu: React.FC<IOwnProps> = ({ dropdownWidth }) => {
  const dispatch = useTypedDispatch();
  const { isGuest } = useAuth();
  return (
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
  );
};

export default HeaderDropDownMenu;
