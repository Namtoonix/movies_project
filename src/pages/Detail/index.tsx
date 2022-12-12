import { DetailProvider } from "./context";
import { Main } from "./features/Main/lazyload";

function Detail() {
  return (
    <DetailProvider>
      <Main />
    </DetailProvider>
  );
}

export default Detail;
