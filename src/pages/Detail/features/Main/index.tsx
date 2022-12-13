/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from "components/Loading/lazyload";
import { MovieList } from "components/MovieList/lazyload";
import { NoData } from "components/NoData/lazyload";
import { Percent } from "components/Percent/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import { ModelMovie } from "models/Movie";
import moment from "moment";
import { IMAGE_ORIGIN } from "pages/Detail/constants";
import { useStore } from "pages/Detail/context/store";
import { GRID_VIEW } from "pages/Home/constants";
import { EffectCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "utils/helper";

function Main() {
  const { dispatch, actions, state } = useStore();
  const { detail, loading, videos, loadingVideo, error, query, totalPage } =
    state;
  const { getDetail, getVideo } = ModelMovie();
  const { id } = useParams();
  const [imageUrlBase, setImageUrlBase] = useState(IMAGE_ORIGIN);

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [id]);
  };

  useEffectDidMount(() => {
    if (id) {
      apiFetchDetail(id);
      apiFetchVideo(id);

      setTimeout(() => {
        setImageUrlBase(IMAGE_ORIGIN.replace("w500", "original"));
      }, 5000);
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
      dispatch(actions.getVideoSuccess([...videos, ...data.results]));
      if (totalPage === 0) {
        dispatch(actions.setTotalPage(data.total_pages));
      }
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
        <Loading height="700px" />
      ) : (
        detail.id && (
          <>
            <div className="relative flex flex-wrap items-center overflow-hidden lg:bg-transparent lg:mx-0 mx-[-8px]">
              <div className="relative">
                <img
                  width="1200px"
                  src={`${imageUrlBase}/${detail.backdrop_path}`}
                  alt={detail.title}
                  className="object-cover"
                />
                <img
                  className="absolute h-[90%] top-[50%] translate-y-[-50%] z-[3] rounded-[8px] shadow-xl ml-[8px]"
                  src={`${imageUrlBase}${detail.poster_path}`}
                  alt={detail.title}
                />
                <div className="absolute bg-[#00000090] inset-0 z-[2]"></div>
              </div>
              <div className="lg:w-1/2 w-full lg:absolute relative z-[4] lg:top-[50%] lg:translate-y-[-50%] lg:left-[50%] lg:ml-auto px-[8px] lg:mt-0 mt-[20px] pb-[20px]">
                <h2 className="lg:text-[36px] text-[18px] font-[700] text-white">
                  {detail.title}{" "}
                  <span className="opacity-80">
                    {`(${moment(detail.release_date).year()})`}
                  </span>
                </h2>
                <p className="text-[16px] text-white">
                  {renderGenres(detail.genres)}
                </p>
                <div className="flex items-center">
                  <Percent
                    percent={Math.round(Number(detail.vote_average) * 10)}
                  />
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
            <h3 className="text-[22px] font-[600] mt-[30px] text-white">
              Videos
            </h3>
            <div className="relative">
              {videos.length ? (
                <div className="flex flex-wrap mx-[-12px]">
                  {videos.map((video: Record<string, any>) => (
                    <div
                      key={video.id}
                      className="lg:w-1/3 sm:w-1/2 w-full px-[12px] mt-[20px]"
                    >
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
              ) : (
                <NoData />
              )}
              {query.page < totalPage && (
                <div className="flex justify-center my-[20px]">
                  <span
                    className="cursor-pointer px-[12px] py-[6px] bg-[#fff] text-[#0d243f] hover:bg-[#0d243f] hover:text-[#fff] rounded-full"
                    onClick={() => {
                      dispatch(
                        actions.setQuery({
                          page: query.page + 1,
                        })
                      );
                    }}
                  >
                    View more
                  </span>
                </div>
              )}
              {loadingVideo && (
                <div className="absolute inset-0 bg-[#fffa]">
                  <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                    <Loading height="340px" />
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-[22px] font-[600] mt-[30px] text-white">
              Recommendations
            </h3>
            <MovieList
              id={detail.id}
              type={{
                id: "recommendations",
                title: "Recommendations",
                link: "/recommendations",
              }}
              typeView={GRID_VIEW}
            />
          </>
        )
      )}
      {error && <ToastMessage message={error} />}
    </>
  );
}

export default Main;
