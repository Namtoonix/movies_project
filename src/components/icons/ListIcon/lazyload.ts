import { LazyLoad } from "utils/Loadable";

const ListIcon = LazyLoad({
  cb: () => import("./index"),
});

export { ListIcon };
