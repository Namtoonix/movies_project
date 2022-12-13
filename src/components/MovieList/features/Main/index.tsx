/* eslint-disable react-hooks/exhaustive-deps */
import { MovieItem } from "components/MovieItem/lazyload";
import { useStore } from "components/MovieList/context/store";
import { ModelMovie } from "models/Movie";
import { EffectCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { ReactComponent as LeftArrow } from "assets/left-arrow.svg";
import starIcon from "assets/star_icon.png";
import { Loading } from "components/Loading/lazyload";
import { NoData } from "components/NoData/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import PullToRefresh from "react-simple-pull-to-refresh";
import { GRID_VIEW } from "pages/Home/constants";
import { Image } from "components/Image/lazyload";
import { IMAGE_ORIGIN } from "components/MovieItem/constants";
import moment from "moment";

interface IProps {
  type: Record<string, any>;
  typeView: string;
  id: string;
}

const classNameArrow =
  "absolute top-[50%] w-[50px] h-[50px] translate-y-[-50%] z-[10] rounded-full bg-white shadow-xl p-[8px] opacity-50 hover:opacity-100";

const SLIDES_TO_SHOW = 6;
const ROWS_TO_SHOW = 2;

function Main(props: IProps) {
  const { type, id, typeView } = props;
  const { dispatch, actions, state } = useStore();
  const [imageUrlBase, setImageUrlBase] = useState(IMAGE_ORIGIN);

  const { query, movies, loading, totalPage, error } = state;
  const { getList } = ModelMovie();

  const useEffectDidChangeQuery = (effect: EffectCallback) => {
    useEffect(effect, [query]);
  };

  useEffectDidChangeQuery(() => {
    apiFetchList();
    setTimeout(() => {
      setImageUrlBase(IMAGE_ORIGIN.replace("w200", "w500"));
    }, 5000);
  });

  const useEffectDidChangeType = (effect: EffectCallback) => {
    useEffect(effect, [type.id]);
  };

  useEffectDidChangeType(() => {
    apiChangeType();
  });

  const apiChangeType = async () => {
    dispatch(actions.getMoviesList());

    const { data, isError } = await getList(type.id, query, id);
    if (isError) {
      dispatch(actions.getMoviesListError(data.message || "Fetch error!"));
    } else {
      dispatch(actions.getMoviesListSuccess(data.results));
      if (totalPage === 0) {
        dispatch(actions.setTotalPage(data.total_pages));
      }
    }
  };

  const apiFetchList = async () => {
    dispatch(actions.getMoviesList());

    const { data, isError } = await getList(type.id, query, id);
    if (isError) {
      dispatch(actions.getMoviesListError(data.message || "Fetch error!"));
    } else {
      dispatch(actions.getMoviesListSuccess([...movies, ...data.results]));
      if (totalPage === 0) {
        dispatch(actions.setTotalPage(data.total_pages));
      }
    }
  };

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div className={`left-[12px] ${classNameArrow}`} onClick={onClick}>
        <LeftArrow />
      </div>
    );
  }

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className={`right-[12px] rotate-180 ${classNameArrow}`}
        onClick={onClick}
      >
        <LeftArrow />
      </div>
    );
  }

  const settings: any = {
    speed: 500,
    infinite: false,
    slidesToShow: SLIDES_TO_SHOW,
    slidesToScroll: 2,
    rows: ROWS_TO_SHOW,
    lazyLoad: true,
    draggable: false,
    initialSlide: Number(query.page - 1) * 20,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    afterChange: (index: number) => {
      if (
        index * ROWS_TO_SHOW ===
          movies.length - SLIDES_TO_SHOW * ROWS_TO_SHOW &&
        query.page < totalPage
      ) {
        dispatch(
          actions.setQuery({
            ...query,
            page: query.page + 1,
          })
        );
      }
    },
  };

  return (
    <div className="relative min-h-[600px]">
      {movies?.length ? (
        <PullToRefresh
          onRefresh={async () => {
            await apiChangeType();
          }}
        >
          {typeView === GRID_VIEW ? (
            <Slider {...settings}>
              {movies.map((movie: Record<string, any>) => (
                <MovieItem dataMovie={movie} />
              ))}
            </Slider>
          ) : (
            <>
              <table>
                <tr className="border-b-[1px] border-b-[#ccc]">
                  <th className="w-[15%] py-[8px]">Poster</th>
                  <th className="w-[20%] py-[8px]">Name</th>
                  <th className="w-[10%] py-[8px]">Released Date</th>
                  <th className="w-[15%] py-[8px]">Vote Rate</th>
                  <th className="w-[40%] py-[8px]">Overview</th>
                </tr>
                {movies.map((movie: Record<string, any>, index: number) => (
                  <tr
                    key={movie.id}
                    className={`border-b-[1px] border-b-[#ccc]`}
                  >
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <Image
                          image={`${imageUrlBase}${movie.poster_path}`}
                          alt={movie.title}
                          effect="opacity"
                          height="120px"
                          width="80px"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{movie.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{moment(movie.release_date).format("ll")}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{movie.vote_average}</span>
                        <img
                          width="24"
                          src={starIcon}
                          alt="star"
                          className="mx-[4px]"
                        />
                        <span>{`(${movie.vote_count})`}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center py-[8px] ">
                        <span>{movie.overview}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div className="flex justify-center my-[20px]">
                <span
                  className="cursor-pointer px-[12px] py-[6px] bg-[#fff] text-[#0d243f] hover:bg-[#0d243f] hover:text-[#fff] rounded-full"
                  onClick={() => {
                    dispatch(
                      actions.setQuery({
                        ...query,
                        page: query.page + 1,
                      })
                    );
                    setImageUrlBase(IMAGE_ORIGIN.replace("w500", "w200"));
                  }}
                >
                  View more
                </span>
              </div>
            </>
          )}
        </PullToRefresh>
      ) : (
        <NoData />
      )}
      {loading && (
        <div className="absolute inset-0 bg-[#fffa]">
          <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Loading height="340px" />
          </div>
        </div>
      )}
      {error && <ToastMessage message={error} />}
    </div>
  );
}

export default Main;
