import { buildQueryString, fetchJson, handleResponse } from "utils/helper";
import { API_KEY, API_URL, LANGUAGE } from "./constants";

const endpoint = `${API_URL}/movie`;
const header = { "Content-Type": "application/json" };

export const ModelMovie = () => {
  const GetList = async (
    type: string,
    query: Record<string, string>,
    id: any
  ) => {
    const queryString = buildQueryString(
      {
        ...query,
        api_key: API_KEY,
        language: LANGUAGE,
      },
      []
    );
    try {
      const response = await fetchJson(
        `${endpoint}/${id ? `${id}/` : ""}${type}${queryString}`,
        {
          method: "GET",
          headers: header,
        }
      );

      return handleResponse(response);
    } catch (error) {
      return Promise.resolve({
        data: error,
        isError: true,
      });
    }
  };

  const GetDetail = async (id: string) => {
    const queryString = buildQueryString(
      {
        api_key: API_KEY,
        language: LANGUAGE,
      },
      []
    );
    try {
      const response = await fetchJson(`${endpoint}/${id}${queryString}`, {
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

  const GetVideo = async (id: string) => {
    const queryString = buildQueryString(
      {
        api_key: API_KEY,
      },
      []
    );
    try {
      const response = await fetchJson(
        `${endpoint}/${id}/videos${queryString}`,
        {
          method: "GET",
          headers: header,
        }
      );

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
    getDetail: GetDetail,
    getVideo: GetVideo,
  };
};
