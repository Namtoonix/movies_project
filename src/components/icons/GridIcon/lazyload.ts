import { LazyLoad } from "utils/Loadable";

const GridIcon = LazyLoad({
  cb: () => import("./index"),
});

export { GridIcon };
