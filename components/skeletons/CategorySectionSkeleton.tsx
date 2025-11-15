import { Skeleton } from "../ui/skeleton";

export const CategorySectionSkeleton = () => {
  return (
    <div className="w-full max-w-7xl m-auto mt-14 mb-14">
      <div className="w-full flex items-center justify-between mb-8">
        <Skeleton className="w-60 h-8" />
        <Skeleton className="w-40 h-8" />
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        {Array.from({ length: 10 }).map((_, index) => {
          return <Skeleton key={index} className="w-full aspect-9/16" />;
        })}
      </div>
    </div>
  );
};
