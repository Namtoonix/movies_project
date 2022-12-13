import { LazyLoad } from "utils/Loadable";

const ToastMessage = LazyLoad({
  cb: () => import("./index"),
});

export { ToastMessage };
