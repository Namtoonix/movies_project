import { LazyLoad } from "utils/Loadable";

const SearchBar = LazyLoad({
  cb: () => import("./index"),
});

export { SearchBar };
