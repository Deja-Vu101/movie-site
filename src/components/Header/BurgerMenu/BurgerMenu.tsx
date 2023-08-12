import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./burger.scss";
import TitleSite from "../TitleSite";

const BurgerMenu = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visibleDropMenu, setVisibleDropMenu] = useState(false);


  return (
    <div className="BurgerMenu">
      <div onClick={() => setVisibleDropMenu(!visibleDropMenu)}>
        <RxHamburgerMenu />
      </div>

      <div
        className="DropMenu"
        style={{ display: visibleDropMenu ? "block" : "none" }}
        ref={ref}
      >
        <TitleSite />
        123
      </div>
    </div>
  );
};

export default BurgerMenu;
