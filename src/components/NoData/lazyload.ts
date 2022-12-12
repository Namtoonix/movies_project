import { LazyLoad } from "utils/Loadable";

const NoData = LazyLoad({
  cb: () => import("./index"),
});

export { NoData };
