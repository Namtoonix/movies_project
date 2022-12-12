import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
  data: Record<string, any>;
}

function Main(props: IProps) {
  const { data } = props;
  return (
    <div className="p-[10px]">
      <Link to={`/${data.id}`}>
        <div className="rounded-[8px] overflow-hidden">
          <Image
            image={`${IMAGE_ORIGIN}${data.poster_path}`}
            alt={data.title}
            effect="opacity"
            height="220px"
          />
        </div>
        <h2 className="font-[700] text-[16px]">{data.title}</h2>
        <p className="text-[#00000099]">
          {moment(data.release_date).format("ll")}
        </p>
      </Link>
    </div>
  );
}

export default Main;
