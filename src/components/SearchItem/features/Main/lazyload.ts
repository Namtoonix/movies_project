import { LazyLoad } from "utils/Loadable";

const Main = LazyLoad({
  cb: () => import("./index"),
});

export { Main };
