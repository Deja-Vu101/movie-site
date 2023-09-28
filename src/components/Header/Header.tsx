import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import "./style.header.scss";
import TitleSite from "./TitleSite";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useState } from "react";

const Header = () => {
  const dispatch = useTypedDispatch();
  const { name } = useAuth();
  const { avatarURL } = useTypedSelector((state) => state.user);

  const [visibleHeaderMenu, setVisibleHeaderMenu] = useState(true);

  const headerProfileRef = useRef<HTMLDivElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    if (headerProfileRef.current) {
      const width = headerProfileRef.current.offsetWidth;
      setDropdownWidth(width);
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector(".header");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add("scrolled_header");
      } else {
        header?.classList.remove("scrolled_header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_content">
          <BurgerMenu />
          <TitleSite />
          <NavBar />
        </div>
        <div
          className="Header_Profile"
          onClick={() => setVisibleHeaderMenu(!visibleHeaderMenu)}
          ref={headerProfileRef}
        >
          <div className="Image_Profile">
            <img
              className="ProfileImg"
              src={
                avatarURL ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
              }
              alt="Image profile"
            />
          </div>
          <div>{name}</div>
          {visibleHeaderMenu && (
            <div className="DropdownMenu" style={{ width: dropdownWidth }}>
              <ul>
                <li>
                  <NavLink to={"/profile"}>View profile</NavLink>
                </li>

                <li>
                  <NavLink to={"/profile/favorite/movies"}>Favorite</NavLink>
                </li>

                <li>
                  <NavLink to={"/profile/watchlist/movies"}>Watchlist</NavLink>
                </li>
                <ul style={{ marginTop: "4px" }}>
                  <li>
                    <NavLink to={"/profile/edit"}>Edit profile</NavLink>
                  </li>

                  <li>
                    <span onClick={() => dispatch(logout())}>Logout</span>
                  </li>
                </ul>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
