"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios-instance";
import { MovieImage } from "../common/MovieImage";
import { Star } from "lucide-react";

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
    <div className="w-full max-w-7xl m-auto">
      <div className="w-full flex items-center justify-between">
        <p>{categoryName}</p>
        <Button variant="ghost">See more</Button>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        {movies.slice(0, 10).map((movie) => {
          return (
            <div key={movie.id}>
              <MovieImage
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                className=""
              />
              <div>
                <div className="flex gap-2">
                  <Star size={28} strokeWidth={0} fill="#FDE047" />
                  <p>
                    {movie.vote_average} <span>/10</span>
                  </p>
                </div>
                <p>{movie.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
