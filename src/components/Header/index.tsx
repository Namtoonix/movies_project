import { HeaderProvider } from "./context";
import { Main } from "./features/Main/lazyload";

const Header = () => {
  return (
    <HeaderProvider>
      <Main />
    </HeaderProvider>
  );
};

export default Header;
