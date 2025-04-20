export interface GetTracksBody {
  page?: number;
  limit?: number;
  sort?: "title" | "artist" | "album" | "createdAt";
  order?: "asc" | "desc";
  search?: string;
  genre?: string;
  artist?: string;
}
