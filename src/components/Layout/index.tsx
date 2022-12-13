import { Header } from "../Header/lazyload";

const MasterLayout = ({ children }: any) => {
  return (
    <div className="bg-[#5eb8cefa] min-h-screen">
      <Header></Header>
      <div className="max-w-[1200px] mx-auto lg:px-0 px-[8px] pb-[30px]">{children}</div>
    </div>
  );
};

export default MasterLayout;
