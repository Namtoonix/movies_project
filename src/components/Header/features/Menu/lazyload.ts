import { LazyLoad } from "utils/Loadable";

const Menu = LazyLoad({
  cb: () => import("./index"),
});

export { Menu };
