import { CollectionProvider } from "./context";
import { Main } from "./features/Main/lazyload";

interface IProps {
  type: Record<string, any>;
  id?: string;
}

function MovieList(props: IProps) {
  const { type, id } = props;
  return (
    <CollectionProvider>
      <Main type={type} id={id} />
    </CollectionProvider>
  );
}

MovieList.defaultProps = {
  id: "",
};

export default MovieList;
