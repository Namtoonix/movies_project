import {
  GET_MOVIE_LIST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_ERROR,
} from "./constants";

export const getMoviesList = (payload: any) => ({
  type: GET_MOVIE_LIST,
  payload,
});
export const getMoviesListSuccess = (payload: any) => ({
  type: GET_MOVIE_LIST_SUCCESS,
  payload,
});
export const getMoviesListError = (payload: any) => ({
  type: GET_MOVIE_LIST_ERROR,
  payload,
});
