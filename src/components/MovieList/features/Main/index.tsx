/* eslint-disable react-hooks/exhaustive-deps */
import { MovieItem } from "components/MovieItem/lazyload";
import { useStore } from "components/MovieList/context/store";
import { ModelMovie } from "models/Movie";
import { EffectCallback, useEffect } from "react";
import Slider from "react-slick";
import { ReactComponent as LeftArrow } from "assets/left-arrow.svg";

interface IProps {
  type: Record<string, any>;
}

const classNameArrow =
  "absolute top-[40%] w-[50px] h-[50px] translate-y-[-50%] z-[10]";

function Main(props: IProps) {
  const { type } = props;
  const { dispatch, actions, state } = useStore();
  const { query, movies } = state;
  const { getList } = ModelMovie();

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [query]);
  };

  useEffectDidMount(() => {
    apiFetchList();
  });

  const apiFetchList = async () => {
    dispatch(actions.getMoviesList());

    const { data, isError } = await getList(type.id, query);
    if (isError) {
      dispatch(actions.getMoviesListError(data || "Fetch error!"));
    } else {
      dispatch(actions.getMoviesListSuccess(data.results));
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
    slidesToShow: 7,
    slidesToScroll: 3,
    lazyLoad: true,
    initialSlide: 7,
    draggable: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    movies?.length && (
      <div className="mt-[20px]">
        <h2 className="text-[24px] font-[600]">{type.title}</h2>
        <Slider {...settings}>
          {movies.map((movie: Record<string, any>) => (
            <MovieItem dataMovie={movie} />
          ))}
        </Slider>
      </div>
    )
  );
}

export default Main;
