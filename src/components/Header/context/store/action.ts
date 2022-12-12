import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./constants";

export const getUserData = (payload: any) => ({
  type: GET_USER_DATA,
  payload,
});
export const getUserDataSuccess = (payload: any) => ({
  type: GET_USER_DATA_SUCCESS,
  payload,
});
export const getUserDataError = (payload: any) => ({
  type: GET_USER_DATA_ERROR,
  payload,
});
