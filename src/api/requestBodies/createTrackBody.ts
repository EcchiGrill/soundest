import { Track } from "../responses/track.type";

export interface CreateTrackBody
  extends Omit<
    Track,
    "id" | "slug" | "audioFile" | "createdAt" | "updatedAt"
  > {}
