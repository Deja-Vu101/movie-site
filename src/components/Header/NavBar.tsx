import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
