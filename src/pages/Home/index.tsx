import { MovieList } from "components/MovieList/lazyload";
import { TYPES } from "./constants";

const Header = () => {
  return (
    <div className="w-full">
      {TYPES.map((type) => (
        <MovieList key={type.id} type={type} />
      ))}
    </div>
  );
};

export default Header;
