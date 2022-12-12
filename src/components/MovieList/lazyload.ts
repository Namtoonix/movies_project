import { LazyLoad } from "utils/Loadable";

const MovieList = LazyLoad({
  cb: () => import("./index"),
});

export { MovieList };
