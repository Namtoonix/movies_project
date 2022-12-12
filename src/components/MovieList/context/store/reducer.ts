import {
  GET_MOVIE_LIST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_ERROR,
  DEFAULT_PAGE,
} from "./constants";

export const initialState = {
  error: "",
  loading: false,
  movies: [],
  query: {
    page: DEFAULT_PAGE,
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_MOVIE_LIST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case GET_MOVIE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error("Action invalid");
  }
};

export default reducer;
