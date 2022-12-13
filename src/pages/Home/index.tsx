import { GridIcon } from "components/icons/GridIcon/lazyload";
import { ListIcon } from "components/icons/ListIcon/lazyload";
import { MovieList } from "components/MovieList/lazyload";
import { useState } from "react";
import { GRID_VIEW, LIST_VIEW, TYPES } from "./constants";

const Header = () => {
  const [tabActive, setTabActive] = useState(TYPES[0]);
  const [typeView, setTypeView] = useState(GRID_VIEW);

  return (
    <div className="w-full mt-[20px]">
      <div className="flex justify-between">
        <ul className="flex">
          {TYPES.map((type) => (
            <li
              key={type.id}
              className={`sm:text-[20px] text-[16px] font-[600] text-white sm:px-[20px] sm:py-[6px] px-[10px] py-[4px] hover:bg-white rounded-t-[8px] hover:text-[#0d243f] cursor-pointer ${
                tabActive.id === type.id ? "bg-white text-[#0d243f]" : ""
              }`}
              onClick={() => setTabActive(type)}
            >
              {type.title}
            </li>
          ))}
        </ul>
        <div className="sm:flex hidden mr-[12px]">
          <span
            className="w-[40px] flex cursor-pointer"
            onClick={() => setTypeView(GRID_VIEW)}
          >
            <GridIcon fill={typeView === GRID_VIEW ? "#0d243f" : "#fff"} />
          </span>
          <span
            className="w-[24px] flex cursor-pointer"
            onClick={() => setTypeView(LIST_VIEW)}
          >
            <ListIcon fill={typeView === LIST_VIEW ? "#0d243f" : "#fff"} />
          </span>
        </div>
      </div>
      <div
        className={`border-[2px] border-white sm:rounded-b-[12px] sm:rounded-tr-[12px] rounded-b-[6px] rounded-tr-[6px] ${
          tabActive.id !== TYPES[0].id
            ? "sm:rounded-tl-[12px] rounded-tl-[6px]"
            : ""
        }`}
      >
        <MovieList type={tabActive} typeView={typeView} />
      </div>
    </div>
  );
};

export default Header;
