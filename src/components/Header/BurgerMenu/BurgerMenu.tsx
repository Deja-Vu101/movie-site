import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./burger.scss";
import TitleSite from "../TitleSite";
import BurgerSectionMenu from "./BurgerSectionMenu";
import BurgerSectionProfile from "./BurgerSectionProfile";

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

      <div
        className={`DropMenu ${visibleDropMenu ? "activeMenu" : ""}`}
        ref={menuRef}
      >
        <div className="DropMenu_Container">
          <div className="TitleSite">
            <TitleSite />
          </div>

          <BurgerSectionMenu />

          <BurgerSectionProfile />
        </div>
      </div>

      <div
        className={`Backdrop ${visibleDropMenu ? "activeBackDrop" : ""}`}
      ></div>
    </div>
  );
};

export default BurgerMenu;
