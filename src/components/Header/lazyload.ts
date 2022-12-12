import { LazyLoad } from "utils/Loadable";

const Header = LazyLoad({
  cb: () => import("./index"),
});

export { Header };
