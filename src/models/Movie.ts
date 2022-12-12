import { buildQueryString, fetchJson, handleResponse } from "utils/helper";
import { API_KEY, API_URL, LANGUAGE } from "./constants";

const endpoint = `${API_URL}/movie`;
const header = { "Content-Type": "application/json" };

export const ModelMovie = () => {
  const GetList = async (type: string, query: Record<string, string>) => {
    const queryString = buildQueryString(
      {
        ...query,
        api_key: API_KEY,
        language: LANGUAGE,
      },
      []
    );
    try {
      const response = await fetchJson(`${endpoint}/${type}${queryString}`, {
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
