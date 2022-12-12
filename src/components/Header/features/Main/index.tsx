import { ReactComponent as ReactLogo } from "assets/logo.svg";
import { Menu } from "../Menu/lazyload";

function Main() {
  return (
    <div className="py-[12px] px-[40px] bg-[#0d243f] relative z-[99]">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center">
        <a className="w-1/6 pr-[12px]" href="/">
          <ReactLogo />
        </a>
        <div className="w-3/6">
          <Menu />
        </div>
        <div className="w-2/6">Account</div>
      </div>
    </div>
  );
}

export default Main;
