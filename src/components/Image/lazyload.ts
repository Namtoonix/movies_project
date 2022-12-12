import { LazyLoad } from "utils/Loadable";

const Image = LazyLoad({
  cb: () => import("./index"),
});

export { Image };
