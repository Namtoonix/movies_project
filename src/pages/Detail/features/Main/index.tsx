/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from "components/Image/lazyload";
import { Loading } from "components/Loading/lazyload";
import { MovieList } from "components/MovieList/lazyload";
import { Percent } from "components/Percent/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import { ModelMovie } from "models/Movie";
import moment from "moment";
import { IMAGE_ORIGIN } from "pages/Detail/constants";
import { useStore } from "pages/Detail/context/store";
import { EffectCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "utils/helper";

function Main() {
  const { dispatch, actions, state } = useStore();
  const { detail, loading, videos, loadingVideo, error } = state;
  const { getDetail, getVideo } = ModelMovie();
  const { id } = useParams();

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [id]);
  };

  useEffectDidMount(() => {
    if (id) {
      apiFetchDetail(id);
      apiFetchVideo(id);
    }
  });

  const apiFetchDetail = async (id: string) => {
    dispatch(actions.getDetail());

    const { data, isError } = await getDetail(id);
    if (isError) {
      dispatch(actions.getDetailError(data.message || "Fetch error!"));
    } else {
      dispatch(actions.getDetailSuccess(data));
    }
  };

  const apiFetchVideo = async (id: string) => {
    dispatch(actions.getVideo());

    const { data, isError } = await getVideo(id);
    if (isError) {
      dispatch(actions.getVideoError(data || "Fetch error!"));
    } else {
      dispatch(actions.getVideoSuccess(data.results));
    }
  };

  const renderGenres = (genres: Array<Record<string, any>>) => {
    return genres.map((genre, index) => (
      <span>
        {genre.name}
        {index === genres.length - 1 ? "." : ", "}
      </span>
    ));
  };

  return (
    <>
      {loading ? (
        <Loading height="500px" />
      ) : (
        detail.id && (
          <>
            <div className="flex items-center py-[30px] overflow-hidden">
              <div className="absolute left-0 right-0 top-0 z-[1] overflow-hidden">
                <Image
                  loading={false}
                  image={`${IMAGE_ORIGIN}/${detail.backdrop_path}`}
                  alt={detail.title}
                  effect="opacity"
                  height="574px"
                />
              </div>
              <div className="absolute bg-[#00000090] left-0 right-0 top-0 z-[2] h-[574px]"></div>
              <div className="w-1/4 rounded-[8px] overflow-hidden z-[2]">
                <Image
                  loading={false}
                  image={`${IMAGE_ORIGIN}${detail.poster_path}`}
                  alt={detail.title}
                  effect="opacity"
                  height="450px"
                />
              </div>
              <div className="w-3/4 rounded-[8px] overflow-hidden z-[2] ml-[30px]">
                <h2 className="text-[36px] font-[700] text-white">
                  {detail.title}{" "}
                  <span className="opacity-80">
                    {`(${moment(detail.release_date).year()})`}
                  </span>
                </h2>
                <p className="text-[16px] text-white">
                  {renderGenres(detail.genres)}
                </p>
                <div className="flex items-center">
                  <Percent percent={Number(detail.vote_average) * 10} />
                  <span className="ml-[12px] text-white font-[700]">
                    User Score
                  </span>

                  <span className="text-white ml-[12px] pl-[12px] border-l-[1px] border-l-[#0d243f]">{`Revenue: $${formatNumber(
                    detail.revenue
                  )}`}</span>
                </div>
                <p className="font-[400] opacity-70 text-white text-[18px] italic mt-[12px]">
                  {detail.tagline}
                </p>
                <p className="font-[600] text-white text-[20px]">Overview</p>
                <p className="text-white text-[16px]">{detail.overview}</p>
              </div>
            </div>
            <h3 className="text-[22px] font-[600] mt-[30px]">Videos</h3>
            {loadingVideo ? (
              <Loading height="500px" />
            ) : (
              videos.length && (
                <div className="flex flex-wrap mx-[-12px]">
                  {videos.map((video: Record<string, any>) => (
                    <div key={video.id} className="w-1/3 px-[12px] mt-[20px]">
                      <iframe
                        width="100%"
                        height="200px"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              )
            )}
            <MovieList
              id={detail.id}
              type={{
                id: "recommendations",
                title: "Recommendations",
                link: "/recommendations",
              }}
            />
          </>
        )
      )}
      {error && <ToastMessage message={error} />}
    </>
  );
}

export default Main;
