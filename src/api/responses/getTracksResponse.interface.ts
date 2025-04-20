import { Meta } from "./meta.type";
import { Track } from "./track.type";

export interface GetTracksResponse {
  data: Track[];
  meta: Meta;
}
