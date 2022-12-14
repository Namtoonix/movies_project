/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import moment from "moment";
import { EffectCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IProps {
  dataMovie: Record<string, any>;
}

function MovieItem(props: IProps) {
  const { dataMovie } = props;
  const [imageUrlBase, setImageUrlBase] = useState(IMAGE_ORIGIN);

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectDidMount(() => {
    setTimeout(() => {
      setImageUrlBase(IMAGE_ORIGIN.replace("w200", "w500"));
    }, 5000);
  });

  return (
    <div className="p-[10px] hover:opacity-70 duration-300">
      <Link to={`/${dataMovie.id}/detail`}>
        <div className="rounded-[8px] overflow-hidden">
          <Image
            image={`${imageUrlBase}${dataMovie.poster_path}`}
            alt={dataMovie.title}
            effect="opacity"
            height="270px"
          />
        </div>
        <h2 className="font-[700] text-[16px] mt-[8px] leading-[1.4] text-ellipsis overflow-hidden w-full whitespace-nowrap">
          {dataMovie.title}
        </h2>
        <p className="text-[#eee]">
          {moment(dataMovie.release_date).format("ll")}
        </p>
      </Link>
    </div>
  );
}

export default MovieItem;
