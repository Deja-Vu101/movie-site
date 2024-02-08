import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiSolidLogIn } from "react-icons/bi";
import { FaThList } from "react-icons/fa";
import "./burger.scss";
import TitleSite from "../TitleSite";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillPlaySquare } from "react-icons/ai";
import { BsDisplayFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const BurgerMenu = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [visibleDropMenu, setVisibleDropMenu] = useState(false);
  const { isGuest } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisibleDropMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="BurgerMenu">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setVisibleDropMenu(true);
        }}
      >
        <RxHamburgerMenu />
      </div>

      <div
        className={`DropMenu ${visibleDropMenu ? "activeMenu" : ""}`}
        ref={menuRef}
      >
        <div className="DropMenu_Container">
          <div className="TitleSite">
            <TitleSite />
          </div>

          <div className="SectionMenu">
            <span className="NavTitle">Menu</span>
            <nav className="DropMenu_NavBar">
              <NavLink className="NavButton" to={"/"}>
                <FaHome />
                <span>Home</span>
              </NavLink>
              <NavLink className="NavButton" to={"/movie"}>
                <AiFillPlaySquare />
                <span>Movies</span>
              </NavLink>
              <NavLink className="NavButton" to={"/tv"}>
                <BsDisplayFill />
                <span>Tv series</span>
              </NavLink>
              <NavLink className="NavButton" to={"/search"}>
                <FaSearch />
                <span>Search</span>
              </NavLink>
            </nav>
          </div>

          <div className="SectionProfile">
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
          </div>
        </div>
      </div>

      <div
        className={`Backdrop ${visibleDropMenu ? "activeBackDrop" : ""}`}
      ></div>
    </div>
  );
};

export default BurgerMenu;
