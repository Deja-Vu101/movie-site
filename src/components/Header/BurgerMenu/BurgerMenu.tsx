import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./burger.scss";
import TitleSite from "../TitleSite";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiFillPlaySquare } from "react-icons/ai";
import { BsDisplayFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

const BurgerMenu = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [visibleDropMenu, setVisibleDropMenu] = useState(false);

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

      {/*<div
        className="DropMenu"
        style={{ display: visibleDropMenu ? "block" : "none" }}
        ref={menuRef}
      >*/}
      <div
        className={`DropMenu ${visibleDropMenu ? "activeMenu" : ""}`}
        ref={menuRef}
      >
        <div className="DropMenu_Container">
          <div className="TitleSite">
            <TitleSite />
          </div>

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
      </div>

      <div className={`Backdrop ${visibleDropMenu ? 'activeBackDrop' : ''}`}></div>
    </div>
  );
};

export default BurgerMenu;
