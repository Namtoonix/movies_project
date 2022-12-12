import { fetchJson, handleResponse } from "utils/helper";

const endpoint = `https://image.tmdb.org/t/p/original`;
const header = { "Content-Type": "application/json" };

export const ModelImage = () => {
  const GetImage = async (poster_path: string) => {
    try {
      const response = await fetchJson(`${endpoint}${poster_path}`, {
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
    getImage: GetImage,
  };
};
