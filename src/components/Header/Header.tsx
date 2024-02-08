import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./style.header.scss";
import TitleSite from "./TitleSite";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import NavBar from "./NavBar";
import { Navigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const Header = () => {
  const { isGuest, isAuth } = useAuth();

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
      {isAuth || isGuest ? null : <Navigate to={"/login"} />}
      <div className="header_wrapper">
        <div className="header_content">
          <BurgerMenu />
          <TitleSite />
          <NavBar />
        </div>

        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
