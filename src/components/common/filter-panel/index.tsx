"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";
import { FaMagnifyingGlass, FaSpinner } from "react-icons/fa6";
import { DEBOUNCE_TIME, SEARCH_QUERY_REGEX } from "@/constants";
import { Input } from "@/components/ui/input";
import { createQueryString } from "@/helpers/createQueryString";
import Filter from "./filter";
import { FilterType } from "./filter/filter.props";

const orderOptions = [
  { label: "Asc", value: "asc" },
  { label: "Desc", value: "desc" },
];

const sortOptions = [
  { label: "Title", value: "title" },
  { label: "Artist", value: "artist" },
  { label: "Album", value: "album" },
  { label: "Created At", value: "createdAt" },
];

const FilterPanel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter + Sorting handling
  const [genres, setGenres] = useState<{ label: string; value: string }[]>([]);
  const [artists, setArtists] = useState<{ label: string; value: string }[]>(
    []
  );
  const [filters, setFilters] = useState<{
    artist?: string;
    genre?: string;
    order?: string;
    sort?: string;
  }>({
    artist: searchParams.get("artist") ?? undefined,
    genre: searchParams.get("genre") ?? undefined,
    order: searchParams.get("order") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
  });

  const filterItems = [
    {
      type: "sort",
      value: filters.sort,
      options: sortOptions,
      test: "sort-select",
    },
    {
      type: "order",
      value: filters.order,
      options: orderOptions,
      test: "order-select",
    },
    {
      type: "genre",
      value: filters.genre,
      options: genres,
      test: "filter-genre",
    },
    {
      type: "artist",
      value: filters.artist,
      options: artists,
      test: "filter-artist",
    },
  ];

  // Searching handling
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsSearching(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }

    const newTimeout = setTimeout(() => {
      if (e.target.value) {
        router.push(
          `${pathname}?${createQueryString(
            "search",
            e.target.value,
            searchParams
          )}`
        );
      } else {
        router.push(
          `${pathname}?${searchParams
            .toString()
            .replace(SEARCH_QUERY_REGEX, "")}`
        );
      }
      setIsSearching(false);
    }, DEBOUNCE_TIME);

    setTimeoutId(newTimeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    if (!searchParams.toString().length) {
      setFilters({});
      setSearch("");
    }
  }, [searchParams]);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const res = await getTracks();

        setGenres(
          [...new Set(res.data.map((track) => track.genres).flat())].map(
            (genre) => ({ label: genre, value: genre })
          )
        );
        setArtists(
          [...new Set(res.data.map((track) => track.artist).flat())].map(
            (artist) => ({ label: artist, value: artist })
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    getFilters();
  }, []);

  return (
    <div className="flex max-lg:flex-col gap-8 lg:justify-between items-center mt-8">
      <div className="flex gap-4 items-center">
        <div className="relative">
          <Input
            data-testid="search-input"
            value={search}
            placeholder="Search tracks..."
            className="pl-9 text-primary"
            onChange={searchHandler}
          />
          <FaMagnifyingGlass className="absolute left-2.5 top-2.5 text-secondary/80" />
        </div>

        {isSearching && (
          <FaSpinner
            className="text-primary animate-spin h-6 w-6"
            data-testid="loading-tracks"
            data-loading="true"
          />
        )}
      </div>

      <div className="flex max-sm:flex-col gap-4">
        {filterItems.map((filter, i) => (
          <Suspense key={i}>
            <Filter
              test={filter.test}
              options={filter.options}
              setFilters={setFilters}
              type={filter.type as FilterType}
              value={filter.value}
            />
          </Suspense>
        ))}
        <Button
          onClick={() => {
            router.push(pathname);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
