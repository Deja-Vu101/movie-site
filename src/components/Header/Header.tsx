import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import "./style.header.scss";
import TitleSite from "./TitleSite";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

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
          <NavBar />
        </div>

        <NavLink to={"/profile"}>
          <div className="Header_Profile">
            <div className="Image_Profile">
              <img
                className="ProfileImg"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/256px-Default_pfp.svg.png"
                alt="Image profile"
                onClick={() => dispatch(logout())}
              />
            </div>
            <div>{name}</div>

            {/*<button
            className="header_btn_profile"
            onClick={() => dispatch(logout())}
          >
            Logout from {name}
          </button>*/}
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
