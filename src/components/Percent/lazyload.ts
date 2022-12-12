import { LazyLoad } from "utils/Loadable";

const Percent = LazyLoad({
  cb: () => import("./index"),
});

export { Percent };
