import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import "./style.header.scss";
import { NavLink } from "react-router-dom";
import TitleSite from "./TitleSite";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Header = () => {
  const dispatch = useTypedDispatch();
  const { name } = useAuth();

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
          <nav>
            <div className="header_list" id="navBar">
              <NavLink className="header_btn" to={"/"}>
                Home
              </NavLink>
              <NavLink className="header_btn" to={"/movie"}>
                Movies
              </NavLink>
              <NavLink className="header_btn" to={"/tv"}>
                Tv series
              </NavLink>
              <NavLink className="header_btn" to={"/search"}>
                Search
              </NavLink>
            </div>
          </nav>
        </div>

        <div>
          <button
            className="header_btn_profile"
            onClick={() => dispatch(logout())}
          >
            Logout from {name}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
