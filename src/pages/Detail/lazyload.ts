import { LazyLoad } from "utils/Loadable";

const Detail = LazyLoad({
  cb: () => import("./index"),
});

export { Detail };
