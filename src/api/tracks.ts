import { fetchApi } from "./fetchApi";

export const getTracks = async () =>
  fetchApi({
    endpoint: `/tracks`,
    method: "GET",
  });
