import { BiSolidLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaThList } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const BurgerSectionProfile = () => {
  const { isGuest } = useAuth();
  return (
    <section className="SectionProfile">
      <span className="NavTitle">Profile</span>
      <nav className="DropMenu_NavBar">
        <NavLink className="NavButton" to={"/profile"}>
          <CgProfile />
          <span>View Profile</span>
        </NavLink>
        <NavLink className="NavButton" to={"/profile/favorite/movies"}>
          <MdFavorite />
          <span>Favorite</span>
        </NavLink>
        <NavLink className="NavButton" to={"/profile/watchlist/movies"}>
          <FaThList />
          <span>Watchlist</span>
        </NavLink>

        {!isGuest && (
          <NavLink className="NavButton" to={"/profile/edit"}>
            Edit profile
          </NavLink>
        )}
        <NavLink className="NavButton LoginButton" to={"/"}>
          <BiSolidLogIn />
          <span>Login</span>
        </NavLink>
      </nav>
    </section>
  );
};

export default BurgerSectionProfile;
