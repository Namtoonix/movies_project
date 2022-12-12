import { Detail } from "pages/Detail/lazyload";
import { Home } from "../pages/Home/lazyload";

export const routers: Array<Record<string, any>> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id/detail",
    element: <Detail />,
  },
];
