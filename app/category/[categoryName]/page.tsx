"use client";

import { MovieCard } from "@/components/cards/MovieCard";
import { Header } from "@/components/header/Header";
import { CategorySectionSkeleton } from "@/components/skeletons/CategorySectionSkeleton";
import { axiosInstance } from "@/lib/axios-instance";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/app/_constants";
import { MoviePagination } from "@/components/pagination/MoviePagination";

const CategorySectionDetail = () => {
  const params = useParams();
  // console.log(params);

  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const category = CATEGORIES.find((el) => el.value === params.categoryName);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axiosInstance(
        `/movie/${params.categoryName}?language=en-US&page=${page}`
      );
      // console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

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
      <div className="grid grid-cols-5 grid-rows-1 gap-8 mb-14">
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
      <div className="w-full justify-end flex pb-20">
        <div>
          <MoviePagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default CategorySectionDetail;
