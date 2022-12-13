import {
  GET_RESULTS,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_ERROR,
  SET_TOTAL_PAGE,
  DEFAULT_PAGE,
  SET_PAGE,
} from "./constants";

export const initialState = {
  error: "",
  loading: false,
  results: [],
  page: DEFAULT_PAGE,
  totalPage: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_RESULTS:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case GET_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      throw new Error("Action invalid");
  }
};

export default reducer;
