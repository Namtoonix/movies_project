import { GET_IMAGE, GET_IMAGE_SUCCESS, GET_IMAGE_ERROR } from "./constants";

export const getImage = (payload: any) => ({
  type: GET_IMAGE,
  payload,
});
export const getImageSuccess = (payload: any) => ({
  type: GET_IMAGE_SUCCESS,
  payload,
});
export const getImageError = (payload: any) => ({
  type: GET_IMAGE_ERROR,
  payload,
});
