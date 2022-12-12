/* eslint-disable react-hooks/exhaustive-deps */
import { MovieItem } from "components/MovieItem/lazyload";
import { useStore } from "components/MovieList/context/store";
import { ModelMovie } from "models/Movie";
import { EffectCallback, useEffect } from "react";
import Slider from "react-slick";

interface IProps {
  type: Record<string, any>;
}

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

  const settings: any = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    lazyLoad: true,
    initialSlide: 7,
  };

  return (
    movies?.length && (
      <Slider {...settings}>
        {movies.map((movie: Record<string, any>) => (
          <MovieItem dataMovie={movie} />
        ))}
      </Slider>
    )
  );
}

export default Main;
