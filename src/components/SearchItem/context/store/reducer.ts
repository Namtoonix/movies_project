import { GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_ERROR } from "./constants";

export const initialState = {
  error: "",
  loading: false,
  detail: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_DETAIL:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case GET_DETAIL_ERROR:
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
