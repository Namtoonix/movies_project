import { GET_IMAGE, GET_IMAGE_SUCCESS, GET_IMAGE_ERROR } from "./constants";

export const initialState = {
  error: "",
  loading: false,
  image: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_IMAGE:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    case GET_IMAGE_ERROR:
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
