import { LazyLoad } from "../../utils/Loadable";

const MasterLayout = LazyLoad({
  cb: () => import("./index"),
});

export { MasterLayout };
