import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
  dataMovie: Record<string, any>;
}

function Main(props: IProps) {
  const { dataMovie } = props;

  return (
    <div className="p-[10px] hover:opacity-70 duration-300">
      <Link to={`/${dataMovie.id}/detail`}>
        <div className="rounded-[8px] overflow-hidden">
          <Image
            image={`${IMAGE_ORIGIN}${dataMovie.poster_path}`}
            alt={dataMovie.title}
            effect="opacity"
            height="220px"
          />
        </div>
        <h2 className="font-[700] text-[16px] mt-[8px] leading-[1.4]">
          {dataMovie.title}
        </h2>
        <p className="text-[#00000099]">
          {moment(dataMovie.release_date).format("ll")}
        </p>
      </Link>
    </div>
  );
}

export default Main;
