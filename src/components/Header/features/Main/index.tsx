import { ReactComponent as ReactLogo } from "assets/logo.svg";
import { Menu } from "../Menu/lazyload";

function Main() {
  return (
    <div className="flex flex-wrap items-center py-[12px] px-[40px] bg-[#0d243f]">
      <a className="w-1/6 pr-[12px]" href="/">
        <ReactLogo />
      </a>
      <div className="w-3/6">
        <Menu />
      </div>
      <div className="w-2/6">Account</div>
    </div>
  );
}

export default Main;
