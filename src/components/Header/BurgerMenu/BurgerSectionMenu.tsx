import { AiFillPlaySquare } from "react-icons/ai";
import { BsDisplayFill } from "react-icons/bs";
import { FaHome, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const BurgerSectionMenu = () => {
  return (
    <section className="SectionMenu">
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
    </section>
  );
};

export default BurgerSectionMenu;
