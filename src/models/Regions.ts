import { buildQueryString, fetchJson, handleResponse } from "utils/helper";
import { API_KEY, API_URL } from "./constants";

const endpoint = `${API_URL}/watch/providers/regions`;
const header = { "Content-Type": "application/json" };

export const ModelRegions = () => {
  const GetList = async () => {
    const queryString = buildQueryString(
      {
        api_key: API_KEY,
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
    getList: GetList,
  };
};
