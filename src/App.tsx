import { Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/Layout/lazyload";
import { routers } from "./routes";

function App() {
  return (
    <Routes>
      {routers.map((router: Record<string, any>, index: number) => {
        return (
          <Route
            key={index}
            path={router.path}
            element={<MasterLayout>{router.element}</MasterLayout>}
          />
        );
      })}
    </Routes>
  );
}

export default App;
