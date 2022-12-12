import { LazyLoad } from "utils/Loadable";

const NotFound = LazyLoad({
  cb: () => import("./index"),
});

export { NotFound };
