"use client";

import { MovieImage } from "@/components/common/MovieImage";
import { axiosInstance } from "@/lib/axios-instance";
import { Star } from "lucide-react";
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
      <div className="w-full flex items-center justify-start">
        <p className="justify-start text-text-text-foreground text-3xl font-semibold font-['Inter'] leading-9">
          {params.categoryName}
        </p>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-8">
        {movies.map((movie) => {
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

export default Home;
