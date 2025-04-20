import { Track } from "@/api/responses/track.type";

export interface TrackProps
  extends Omit<Track, "createdAt" | "updatedAt" | "id"> {}
