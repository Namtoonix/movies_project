import { LazyLoad } from "utils/Loadable";

const SearchItem = LazyLoad({
  cb: () => import("./index"),
});

export { SearchItem };
