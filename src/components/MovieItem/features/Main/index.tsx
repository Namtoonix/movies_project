import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import { useStore } from "components/MovieItem/context/store";
import { ModelImage } from "models/Image";
import moment from "moment";
import { EffectCallback, useEffect } from "react";
import { Link } from "react-router-dom";

interface IProps {
  dataMovie: Record<string, any>;
}

function Main(props: IProps) {
  const { dataMovie } = props;
  const { dispatch, actions, state } = useStore();
  const { image, loading } = state;
  const { getImage } = ModelImage();

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [dataMovie.poster_path]);
  };

  useEffectDidMount(() => {
    apiFetchImage();
  });

  const apiFetchImage = async () => {
    dispatch(actions.getImage());

    const { data, isError } = await getImage(dataMovie.poster_path);
    if (isError) {
      dispatch(actions.getImageError(data || "Fetch error!"));
    } else {
      dispatch(actions.getImageSuccess(data));
    }
  };
  console.log(image);
  return (
    <div className="p-[10px]">
      <Link to={`/${dataMovie.id}`}>
        <div className="rounded-[8px] overflow-hidden">
          <Image
            loading={loading}
            image={`${IMAGE_ORIGIN}${dataMovie.poster_path}`}
            alt={dataMovie.title}
            effect="opacity"
            height="220px"
          />
        </div>
        <h2 className="font-[700] text-[16px]">{dataMovie.title}</h2>
        <p className="text-[#00000099]">
          {moment(dataMovie.release_date).format("ll")}
        </p>
      </Link>
    </div>
  );
}

export default Main;
