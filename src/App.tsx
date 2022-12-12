import { Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/Layout/lazyload";
import { NotFound } from "./pages/NotFound/lazyload";
import { routers } from "./routes";

function App() {
  return (
    <MasterLayout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {routers.map((router: Record<string, any>, index: number) => {
          return (
            <Route key={index} path={router.path} element={router.element} />
          );
        })}
      </Routes>
    </MasterLayout>
  );
}

export default App;
