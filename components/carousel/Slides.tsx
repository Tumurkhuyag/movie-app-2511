"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/axios-instance";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Slides = () => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance(
        "/movie/now_playing?language=en-US&page=1"
      );
      console.log(data.results);
      setMovies(data.results);
    };
    fetchData();
  }, []);

  return (
    <Carousel className="w-full bg-amber-300">
      <CarouselContent>
        {movies.map((movie, index) => {
          const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}/original${movie.backdrop_path}`;
          return (
            <CarouselItem key={index} className="p-0">
              <div className="w-full h-[600]">
                <Image
                  src={imgUrl}
                  width={500}
                  height={500}
                  alt={movie.title}
                  className="h-full w-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-11" />
      <CarouselNext className="right-11" />
    </Carousel>
  );
};
