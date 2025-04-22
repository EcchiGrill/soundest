import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoChevronDownSharp } from "react-icons/io5";
import { IFilterProps } from "./filter.props";
import { createQueryString } from "@/helpers/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = ({ type, value, options, setFilters, test }: IFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeFilterHandler = (value: string) => {
    setFilters({ [type]: value });
    router.push(
      `${pathname}?${createQueryString(
        type,
        value,
        searchParams.get("search")
          ? "search=" + searchParams.get("search")
          : undefined
      )}`
    );
  };

  return (
    <DropdownMenu data-testid={test}>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="capitalize">
          {type} <IoChevronDownSharp className="mt-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-primary bg-background border border-secondary/20">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => {
            changeFilterHandler(v);
          }}
        >
          {options.map((option, i) => (
            <DropdownMenuRadioItem
              key={i}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
