import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import "./style.header.scss";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useTypedDispatch();
  const { email } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const buttons = document.querySelectorAll(".header_btn");

    buttons.forEach((button) => {
      const href = button.getAttribute("href");
      if (href && href === location.pathname) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }, [location]);

  //const header = document.querySelector(".header");

  //window.addEventListener("scroll", () => {
  //  if (window.scrollY > 100) {
  //    header?.classList.add("scrolled_header");
  //  } else {
  //    header?.classList.remove("scrolled_header");
  //  }
  //});
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
          <div className="header_title">
            Movie<span className="header_title_word">React</span>
          </div>

          <nav>
            <ul className="header_list">
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
            </ul>
          </nav>
        </div>

        <div>
          <button
            className="header_btn_profile"
            onClick={() => dispatch(logout())}
          >
            Logout from {email}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
