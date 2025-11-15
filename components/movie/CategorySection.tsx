"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios-instance";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MovieCard } from "../cards/MovieCard";

export const CategorySection = ({
  categoryName,
  categoryValue,
}: {
  categoryName: string;
  categoryValue: string;
}) => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axiosInstance(
        `/movie/${categoryValue}?language=en-US&page=1`
      );
      // console.log(data.results);
      setMovies(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl m-auto mt-14 mb-14">
      <div className="w-full flex items-center justify-between mb-8">
        <p className="text-2xl font-semibold items-center">{categoryName}</p>
        {/* {console.log(categoryValue)} */}
        <Link href={`/category/${categoryValue}`}>
          <Button variant="ghost">
            <p>See more</p>
            <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        {movies?.slice(0, 10).map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              title={movie.title}
              vote_average={movie.vote_average}
              className=""
            />
          );
        })}
      </div>
    </div>
  );
};
