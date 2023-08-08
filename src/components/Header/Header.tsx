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
          <button className="header_btn" onClick={() => dispatch(logout())}>
            Logout from {email}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
