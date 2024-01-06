export type FilterParams = {
  status: string;
  gender: string;
};

export type Character = {
  id: number | null;
  picture: string;
  name: string;
  status: string;
  gender: string;
  episodes: string[];
};
