import { Header } from "../Header/lazyload";

const MasterLayout = ({ children }: any) => {
  return (
    <div>
      <Header></Header>
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </div>
  );
};

export default MasterLayout;
