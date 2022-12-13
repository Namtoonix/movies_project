import { ReactComponent as ReactLogo } from "assets/logo.svg";
import menuIcon from "assets/menu_icon.png";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "utils/helper";
import { Menu } from "../Menu/lazyload";

function Main() {
  const [showMenu, setShowMenu] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowMenu(false));

  return (
    <div
      ref={wrapperRef}
      className="py-[12px] lg:px-[40px] px-[12px] bg-[#0d243f] relative z-[99]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center">
        <a className="lg:w-1/6 w-[70%] pr-[12px] max-w-[300px]" href="/">
          <ReactLogo />
        </a>
        <span
          className="lg:hidden ml-auto w-[10%]"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={menuIcon} alt="menu bar" />
        </span>
        <div className="lg:w-3/6">
          <Menu showMenu={showMenu} />
        </div>
        <div className="lg:w-2/6 lg:block hidden">Account</div>
      </div>
    </div>
  );
}

export default Main;
