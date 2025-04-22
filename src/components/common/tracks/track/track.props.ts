import { Track } from "@/api/responses/track.type";

export interface ITrackProps extends Omit<Track, "createdAt" | "updatedAt"> {}
