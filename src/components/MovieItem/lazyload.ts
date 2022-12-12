import { LazyLoad } from "utils/Loadable";

const MovieItem = LazyLoad({
  cb: () => import("./index"),
});

export { MovieItem };
