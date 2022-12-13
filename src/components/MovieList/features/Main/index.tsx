/* eslint-disable react-hooks/exhaustive-deps */
import { MovieItem } from "components/MovieItem/lazyload";
import { useStore } from "components/MovieList/context/store";
import { ModelMovie } from "models/Movie";
import { EffectCallback, useEffect } from "react";
import Slider from "react-slick";
import { ReactComponent as LeftArrow } from "assets/left-arrow.svg";
import { Loading } from "components/Loading/lazyload";
import { NoData } from "components/NoData/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import PullToRefresh from "react-simple-pull-to-refresh";

interface IProps {
  type: Record<string, any>;
  id: string;
}

const classNameArrow =
  "absolute top-[40%] w-[50px] h-[50px] translate-y-[-50%] z-[10] rounded-full bg-white shadow-xl p-[8px] opacity-50 hover:opacity-100";

const SLIDES_TO_SHOW = 6;
const ROWS_TO_SHOW = 1;

function Main(props: IProps) {
  const { type, id } = props;
  const { dispatch, actions, state } = useStore();

  const { query, movies, loading, totalPage, error } = state;
  const { getList } = ModelMovie();
  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [query]);
  };

  useEffectDidMount(() => {
    apiFetchList();
  });

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
    <div className="relative mt-[20px]">
      <h2 className="text-[24px] font-[600] absolute top-0 left-0 text-white">
        {type.title}
      </h2>
      {loading ? (
        <Loading height="300px" />
      ) : movies?.length ? (
        <PullToRefresh
          onRefresh={async () => {
            dispatch(actions.reset());
            await apiFetchList();
          }}
        >
          <div className="pt-[40px]">
            <Slider {...settings}>
              {movies.map((movie: Record<string, any>) => (
                <MovieItem dataMovie={movie} />
              ))}
            </Slider>
          </div>
        </PullToRefresh>
      ) : (
        <NoData />
      )}
      {error && <ToastMessage message={error} />}
    </div>
  );
}

export default Main;
