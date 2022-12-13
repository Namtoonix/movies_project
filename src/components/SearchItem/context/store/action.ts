import { GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_ERROR } from "./constants";

export const getDetailItem = (payload: any) => ({
  type: GET_DETAIL,
  payload,
});
export const getDetailItemSuccess = (payload: any) => ({
  type: GET_DETAIL_SUCCESS,
  payload,
});
export const getDetailItemError = (payload: any) => ({
  type: GET_DETAIL_ERROR,
  payload,
});
