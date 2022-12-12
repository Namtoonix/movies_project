import { LazyLoad } from "utils/Loadable";

const Home = LazyLoad({
  cb: () => import("./index"),
});

export { Home };
