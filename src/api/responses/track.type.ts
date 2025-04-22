export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
};
