import { MovieItemProvider } from "./context";
import Main from "./features/Main";

interface IProps {
  dataMovie: Record<string, any>;
}

function MovieItem(props: IProps) {
  const { dataMovie } = props;
  return (
    <MovieItemProvider>
      <Main dataMovie={dataMovie} />
    </MovieItemProvider>
  );
}

export default MovieItem;
