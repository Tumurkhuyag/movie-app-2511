import { Film } from "lucide-react";
import { FilterGenres } from "./FilterGenres";
import { ModeToggle } from "./ModeToggle";
import { Search } from "./Search";

export const Header = () => {
  return (
    <div className="flex justify-between items-center w-full max-w-7xl h-16 m-auto">
      <div className="flex gap-2">
        <Film size={20} strokeWidth={1} />
        <p className="text-base font-bold leading-5 tracking-tight ">Movie Z</p>
      </div>
      <div className="flex gap-3">
        <FilterGenres />
        <Search />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};
