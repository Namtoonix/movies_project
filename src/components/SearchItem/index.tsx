import { SearchItemProvider } from "./context";
import Main from "./features/Main";

interface IProps {
  id: string;
}

function SearchItem(props: IProps) {
  const { id } = props;
  return (
    <SearchItemProvider>
      <Main id={id} />
    </SearchItemProvider>
  );
}

export default SearchItem;
