import {
  GET_DETAIL,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_ERROR,
  GET_VIDEO,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_ERROR,
} from "./constants";

export const getDetail = (payload: any) => ({
  type: GET_DETAIL,
  payload,
});
export const getDetailSuccess = (payload: any) => ({
  type: GET_DETAIL_SUCCESS,
  payload,
});
export const getDetailError = (payload: any) => ({
  type: GET_DETAIL_ERROR,
  payload,
});

export const getVideo = (payload: any) => ({
  type: GET_VIDEO,
  payload,
});
export const getVideoSuccess = (payload: any) => ({
  type: GET_VIDEO_SUCCESS,
  payload,
});
export const getVideoError = (payload: any) => ({
  type: GET_VIDEO_ERROR,
  payload,
});