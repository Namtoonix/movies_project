/* eslint-disable react-hooks/exhaustive-deps */
import { MovieItem } from "components/MovieItem/lazyload";
import { useStore } from "components/MovieList/context/store";
import { ModelMovie } from "models/Movie";
import { EffectCallback, useEffect } from "react";
import Slider from "react-slick";
import { ReactComponent as LeftArrow } from "assets/left-arrow.svg";
import { Loading } from "components/Loading/lazyload";
import { NoData } from "components/NoData/lazyload";

interface IProps {
  type: Record<string, any>;
  id: string;
}

const classNameArrow =
  "absolute top-[40%] w-[50px] h-[50px] translate-y-[-50%] z-[10]";

const SLIDES_TO_SHOW = 6;

function Main(props: IProps) {
  const { type, id } = props;
  const { dispatch, actions, state } = useStore();
  const { query, movies, loading, totalPage } = state;
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
      dispatch(actions.getMoviesListError(data || "Fetch error!"));
    } else {
      console.log(data);
      dispatch(actions.getMoviesListSuccess([...movies, ...data.results]));
      if (totalPage === 0) {
        dispatch(actions.setTotalPage(data.total_pages));
      }
    }
  };

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div className={`left-[-60px] ${classNameArrow}`} onClick={onClick}>
        <LeftArrow />
      </div>
    );
  }

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        className={`right-[-60px] rotate-180 ${classNameArrow}`}
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
    lazyLoad: true,
    draggable: false,
    initialSlide: Number(query.page - 1) * 20,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (index: number) => {
      if (index === movies.length - SLIDES_TO_SHOW && query.page < totalPage) {
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
    <div className="mt-[20px]">
      <h2 className="text-[24px] font-[600]">{type.title}</h2>
      {loading ? (
        <Loading height="300px" />
      ) : movies?.length ? (
        <Slider {...settings}>
          {movies.map((movie: Record<string, any>) => (
            <MovieItem dataMovie={movie} />
          ))}
        </Slider>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Main;
