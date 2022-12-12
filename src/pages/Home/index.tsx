import { MovieList } from "components/MovieList/lazyload";
import { TYPES } from "./constants";

const Header = () => {
  return TYPES.map((type) => <MovieList key={type.id} type={type} />);
};

export default Header;
