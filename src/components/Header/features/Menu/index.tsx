import { Link } from "react-router-dom";
import { MENU_LIST } from "../Main/contants";

function Menu() {
  return (
    <ul className="flex">
      {MENU_LIST.map((item) => (
        <li key={item.id} className="relative group p-[8px] mr-[16px]">
          <Link to={item.link}>
            <span className="font-[600] text-[16px] text-white">
              {item.title}
            </span>
          </Link>
          {item.children.length && (
            <ul className="hidden group-hover:block absolute left-[8px] top-[40px] bg-white py-[8px] rounded-[8px] shadow-xl">
              {item.children.map((child) => (
                <li key={child.id} className="px-[32px] py-[4px] hover:bg-[#eee]">
                  <Link to={child.link}>
                    <span className="whitespace-nowrap">{child.title}</span>
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
