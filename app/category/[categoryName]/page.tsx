"use client";

import { MovieCard } from "@/components/cards/MovieCard";
import { Header } from "@/components/header/Header";
import { CategorySectionSkeleton } from "@/components/skeletons/CategorySectionSkeleton";
import { axiosInstance } from "@/lib/axios-instance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/app/_constants";

const CategorySectionDetail = () => {
  const params = useParams();
  // console.log(params);

  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const category = CATEGORIES.find((el) => el.value === params.categoryName);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axiosInstance(
        `/movie/${params.categoryName}?language=en-US&page=1`
      );
      // console.log(data.results);
      setMovies(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  return (
    <div className="w-full max-w-7xl m-auto">
      <Header />
      <div className="w-full flex mb-8 mt-13">
        <p className="justify-start text-3xl font-semibold leading-9">
          {category?.name}
        </p>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8 mb-14">
        {movies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategorySectionDetail;
