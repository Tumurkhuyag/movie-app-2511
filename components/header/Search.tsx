import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export function Search() {
  return (
    <div className="flex gap-2.5 items-center border rounded-md">
      <SearchIcon className="ml-3 text-neutral-400" size={16} />
      <Input
        type="input"
        placeholder="Search.."
        className="border-none p-0 focus-visible:ring-0 shadow-none"
      />
    </div>
  );
}
