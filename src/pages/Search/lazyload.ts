import { LazyLoad } from "utils/Loadable";

const Search = LazyLoad({
  cb: () => import("./index"),
});

export { Search };
