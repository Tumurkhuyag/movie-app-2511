"use client";

import { MovieCard } from "@/components/cards/MovieCard";
import { Header } from "@/components/header/Header";
import { axiosInstance } from "@/lib/axios-instance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const params = useParams();
  console.log(params);

  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="w-full max-w-7xl m-auto">
      <Header />
      <div className="w-full flex mb-8 mt-13">
        <p className="justify-start text-text-text-foreground text-3xl font-semibold font-['Inter'] leading-9">
          {params.categoryName}
        </p>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        {movies.map((movie) => {
          return (
            <MovieCard
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

export default Home;
