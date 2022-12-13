import { Header } from "../Header/lazyload";
import PullToRefresh from "react-simple-pull-to-refresh";

const MasterLayout = ({ children }: any) => {
  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <div>
      <Header></Header>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="max-w-[1200px] mx-auto">{children}</div>
      </PullToRefresh>
    </div>
  );
};

export default MasterLayout;
