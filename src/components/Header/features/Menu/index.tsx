import { Link } from "react-router-dom";
import { MENU_LIST } from "../Main/contants";
import { ReactComponent as ReactLogo } from "assets/logo.svg";
import { ReactComponent as LeftArrow } from "assets/left-arrow-fill.svg";
import { useState } from "react";

interface IProps {
  showMenu: boolean;
}

function Menu(props: IProps) {
  const { showMenu } = props;
  const [menuActive, setMenuActive] = useState("");

  return (
    <ul
      className={`flex lg:flex-row flex-col lg:relative fixed z-[20] lg:bg-transparent bg-[#0d243ffa] lg:w-full w-[80%] lg:p-0 p-[20px] bottom-0 top-0 duration-500 lg:!left-0 ${
        showMenu ? "left-0" : "left-[-100%]"
      }`}
    >
      <a className="lg:hidden flex w-[70%] mb-[12px] max-w-[300px]" href="/">
        <ReactLogo />
      </a>
      {MENU_LIST.map((item) => (
        <li
          key={item.id}
          className={`item relative group p-[8px] mr-[16px] ${
            menuActive === item.id ? "active" : ""
          }`}
        >
          <div
            className={`flex w-full justify-between items-center 
            `}
            onClick={() => setMenuActive(item.id !== menuActive ? item.id : "")}
          >
            <span className="font-[600] text-[16px] text-white cursor-pointer">
              {item.title}
            </span>
            <span
              className={`lg:hidden w-[16px] h-[16px] duration-500 ${
                menuActive === item.id ? "rotate-90" : "-rotate-90"
              }`}
            >
              <LeftArrow />
            </span>
          </div>
          {item.children.length && (
            <ul
              className={`child lg:hidden lg:group-hover:block lg:absolute left-[8px] top-[40px] lg:bg-white py-[8px] rounded-[8px] lg:shadow-xl overflow-hidden h-fit duration-500 lg:max-h-fit ${
                menuActive === item.id ? "max-h-[300px]" : "max-h-0"
              }`}
            >
              {item.children.map((child) => (
                <li
                  key={child.id}
                  className="px-[32px] py-[4px] lg:hover:bg-[#eee]"
                >
                  <Link to={child.link}>
                    <span className="whitespace-nowrap lg:text-black text-white">
                      {child.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
