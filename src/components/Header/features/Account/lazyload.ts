import { LazyLoad } from "utils/Loadable";

const Account = LazyLoad({
  cb: () => import("./index"),
});

export { Account };
