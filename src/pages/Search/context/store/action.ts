import {
  GET_RESULTS,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_ERROR,
  SET_TOTAL_PAGE,
  SET_PAGE,
} from "./constants";

export const getSearchResults = (payload: any) => ({
  type: GET_RESULTS,
  payload,
});
export const getSearchResultsSuccess = (payload: any) => ({
  type: GET_RESULTS_SUCCESS,
  payload,
});
export const getSearchResultsError = (payload: any) => ({
  type: GET_RESULTS_ERROR,
  payload,
});

export const setTotalPage = (payload: any) => ({
  type: SET_TOTAL_PAGE,
  payload,
});

export const setPage = (payload: any) => ({
  type: SET_PAGE,
  payload,
});
