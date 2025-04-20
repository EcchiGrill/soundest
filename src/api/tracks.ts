import { fetchApi } from "./fetchApi";
import { GetTracksBody } from "./requestBodies/getTracksBody.interface";
import { GetTracksResponse } from "./responses/getTracksResponse.interface";
import { Track } from "./responses/track.type";

export const getTracks = async (
  body?: GetTracksBody
): Promise<GetTracksResponse> =>
  fetchApi({
    endpoint: `/tracks`,
    method: "GET",
    body,
  });

export const getTrackBySlug = async (slug: string): Promise<Track> =>
  fetchApi({
    endpoint: `/tracks/${slug}`,
    method: "GET",
  });
