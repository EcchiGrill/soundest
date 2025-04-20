import { fetchApi } from "./fetchApi";
import { GetTracksBody } from "./requestBodies/getTracksBody.interface";
import { GetTracksResponse } from "./responses/getTracksResponse.interface";

export const getTracks = async (
  body?: GetTracksBody
): Promise<GetTracksResponse> =>
  fetchApi({
    endpoint: `/tracks`,
    method: "GET",
    body,
  });
