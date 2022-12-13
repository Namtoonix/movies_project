/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import moment from "moment";
import { Link } from "react-router-dom";
import starIcon from "assets/star_icon.png";
import { EffectCallback, useEffect } from "react";
import { ModelMovie } from "models/Movie";
import { Loading } from "components/Loading/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import { useStore } from "components/SearchItem/context/store";

interface IProps {
  id: string;
}

function Main(props: IProps) {
  const { id } = props;
  const { dispatch, actions, state } = useStore();
  const { loading, detail, error } = state;

  const { getDetail } = ModelMovie();

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [id]);
  };

  useEffectDidMount(() => {
    if (id) {
      apiFetchDetail(id);
    }
  });

  const apiFetchDetail = async (id: string) => {
    dispatch(actions.getDetailItem());

    const { data, isError } = await getDetail(id);
    if (isError) {
      dispatch(actions.getDetailItemError(data.message || "Fetch error!"));
    } else {
      dispatch(actions.getDetailItemSuccess(data));
    }
  };

  return (
    <>
      {loading ? (
        <Loading height={300} />
      ) : (
        detail?.id && (
          <div className="p-[10px] hover:opacity-70 duration-300 bg-[#fff] shadow-xl mb-[12px] rounded-[12px]">
            <Link to={`/${id}/detail`}>
              <div className="flex px-[20px] py-[8px]">
                <div className="w-[15%]">
                  <Image
                    image={`${IMAGE_ORIGIN}${detail.poster_path}`}
                    alt={detail.title}
                    effect="opacity"
                    height="120px"
                    width="80px"
                  />
                </div>

                <div className="w-[20%]">
                  <span className="text-black">{detail.title}</span>
                </div>

                <div className="w-[10%]">
                  <span className="text-black">
                    {moment(detail.release_date).format("ll")}
                  </span>
                </div>

                <div className="flex w-[15%]">
                  <span className="text-black">{detail.vote_average}</span>
                  <img
                    width="24"
                    src={starIcon}
                    alt="star"
                    className="mx-[4px] max-h-[24px]"
                  />
                  <span className="text-black">{`(${detail.vote_count})`}</span>
                </div>

                <div className="w-[50%]">
                  <span className="text-black max-h-[120px] line-clamp-5">
                    {detail.overview}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )
      )}
      {error && <ToastMessage message={error} />}
    </>
  );
}

export default Main;
