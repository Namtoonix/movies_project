import { buildQueryString, fetchJson, handleResponse } from "utils/helper";
import { API_KEY, API_URL } from "./constants";

const endpoint = `${API_URL}/search/keyword`;
const header = { "Content-Type": "application/json" };

export const ModelSearch = () => {
  const GetResults = async (payload: any) => {
    const queryString = buildQueryString(
      {
        api_key: API_KEY,
        ...payload,
      },
      []
    );
    try {
      const response = await fetchJson(`${endpoint}${queryString}`, {
        method: "GET",
        headers: header,
      });

      return handleResponse(response);
    } catch (error) {
      return Promise.resolve({
        data: error,
        isError: true,
      });
    }
  };

  return {
    getResults: GetResults,
  };
};
