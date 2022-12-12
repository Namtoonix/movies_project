import { LazyLoad } from "utils/Loadable";

const Loading = LazyLoad({
  cb: () => import("./index"),
});

export { Loading };
