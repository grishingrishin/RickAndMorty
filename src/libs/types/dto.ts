export type FilterParams = {
  status: string;
  gender: string;
};

export type Character = {
  id: number | null;
  image: string;
  name: string;
  status: string;
  gender: string;
  episode: string[];
};
