import { MovieList } from "components/MovieList/lazyload";
import { useState } from "react";
import { TYPES } from "./constants";

const Header = () => {
  const [tabActive, setTabActive] = useState(TYPES[0]);

  return (
    <div className="w-full mt-[20px]">
      <ul className="flex">
        {TYPES.map((type) => (
          <li
            key={type.id}
            className={`sm:text-[24px] text-[16px] font-[600] text-white sm:px-[20px] sm:py-[6px] px-[10px] py-[4px] hover:bg-white rounded-t-[8px] hover:text-[#0d243f] cursor-pointer ${
              tabActive.id === type.id ? "bg-white text-[#0d243f]" : ""
            }`}
            onClick={() => setTabActive(type)}
          >
            {type.title}
          </li>
        ))}
      </ul>
      <div
        className={`border-[2px] border-white sm:rounded-b-[12px] sm:rounded-tr-[12px] rounded-b-[6px] rounded-tr-[6px] ${
          tabActive.id !== TYPES[0].id
            ? "sm:rounded-tl-[12px] rounded-tl-[6px]"
            : ""
        }`}
      >
        <MovieList type={tabActive} />
      </div>
    </div>
  );
};

export default Header;
