import { SearchProvider } from "./context";
import { Main } from "./features/Main/lazyload";

function Search() {
  return (
    <SearchProvider>
      <Main />
    </SearchProvider>
  );
}

export default Search;
