"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITracksPaginationProps } from "./track-pagination.props";
import { useSearchParams } from "next/navigation";

const TracksPagination = ({
  pageNumber,
  totalPages,
}: ITracksPaginationProps) => {
  const searchParams = useSearchParams();

  return (
    <Pagination>
      <PaginationContent className="text-primary">
        <PaginationItem>
          <PaginationPrevious
            href={
              pageNumber !== 1
                ? `/page/${pageNumber - 1}?` + searchParams.toString()
                : "/page/1?" + searchParams.toString()
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem
            key={i}
            className={`${
              pageNumber === i + 1 ? "bg-primary text-black rounded-md" : ""
            }`}
          >
            <PaginationLink href={`/page/${i + 1}?` + searchParams.toString()}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={
              pageNumber !== totalPages
                ? `/page/${pageNumber + 1}?` + searchParams.toString()
                : `/page/${pageNumber}?` + searchParams.toString()
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TracksPagination;
