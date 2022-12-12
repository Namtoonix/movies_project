import { MovieItemProvider } from "./context";
import Main from "./features/Main";

interface IProps {
  data: Record<string, any>;
}

function MovieItem(props: IProps) {
  const { data } = props;
  return (
    <MovieItemProvider>
      <Main data={data} />
    </MovieItemProvider>
  );
}

export default MovieItem;
