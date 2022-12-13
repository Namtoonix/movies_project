/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { buildQueryString } from "utils/helper";

function SearchBar() {
  let navigate = useNavigate();

  return (
    <input
      className="px-[12px] py-[6px] rounded-full text-black w-full"
      type="text"
      placeholder="Search"
      onChange={(e) =>
        setTimeout(() => {
          if (e.target.value !== "") {
            navigate(
              `/search${buildQueryString({ query: e.target.value }, [])}`
            );
          } else {
            navigate(`/`);
          }
        }, 500)
      }
    />
  );
}

export default SearchBar;
