import { fetchApi } from "./fetchApi";
import { CreateTrackBody } from "./requestBodies/createTrackBody";
import { EditTrackBody } from "./requestBodies/editTrackBody.interface";
import { GetTracksResponse } from "./responses/getTracksResponse.interface";
import { Track } from "./responses/track.type";

export const getTracks = async (
  params?: string
): Promise<GetTracksResponse> => {
  return fetchApi({
    endpoint: `/tracks${params ? `?${params}` : ""}`,
    method: "GET",
  });
};

export const getTrackBySlug = async (slug: string): Promise<Track> =>
  fetchApi({
    endpoint: `/tracks/${slug}`,
    method: "GET",
  });

export const createTrack = async (body: CreateTrackBody): Promise<Track> =>
  fetchApi({
    endpoint: `/tracks`,
    method: "POST",
    body,
  });

export const editTrackById = async (
  id: string,
  body: EditTrackBody
): Promise<Track> =>
  fetchApi({
    endpoint: `/tracks/${id}`,
    method: "PUT",
    body,
  });

export const deleteTrackById = async (id: string) =>
  fetchApi({
    endpoint: `/tracks/${id}`,
    method: "DELETE",
  });
