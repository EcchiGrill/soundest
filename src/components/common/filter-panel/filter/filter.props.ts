export type FilterType = "sort" | "order" | "artist" | "genre";

export type IFilterProps = {
  test: string;
  type: FilterType;
  value?: string;
  options: { label: string; value: string }[];
  setFilters: ({}: {
    artist?: string;
    genre?: string;
    order?: string;
    sort?: string;
  }) => void;
};
