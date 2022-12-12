import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
} from "./constants";

export const initialState = {
  error: "",
  loading: false,
  userData: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    case GET_USER_DATA_ERROR:
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
