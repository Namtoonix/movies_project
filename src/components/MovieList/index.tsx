import { CollectionProvider } from "./context";
import { Main } from "./features/Main/lazyload";

interface IProps {
  type: Record<string, any>;
}

function MovieList(props: IProps) {
  const { type } = props;
  return (
    <CollectionProvider>
      <Main type={type} />
    </CollectionProvider>
  );
}

export default MovieList;
