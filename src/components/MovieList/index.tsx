import { CollectionProvider } from "./context";
import { Main } from "./features/Main/lazyload";

interface IProps {
  type: Record<string, any>;
  typeView: string;
  id?: string;
}

function MovieList(props: IProps) {
  const { type, id, typeView } = props;
  return (
    <CollectionProvider>
      <Main type={type} id={id} typeView={typeView} />
    </CollectionProvider>
  );
}

MovieList.defaultProps = {
  id: "",
};

export default MovieList;
