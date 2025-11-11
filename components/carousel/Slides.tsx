"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { Slide } from "./Slide";
import { LoaderIcon } from "lucide-react";

export const Slides = () => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axiosInstance(
        "/movie/now_playing?language=en-US&page=1"
      );
      // console.log(data.results);
      setMovies(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <LoaderIcon className="spin" size={30} />
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {movies.map((movie, index) => {
          return (
            <CarouselItem key={index} className="p-0 ">
              <Slide movie={movie} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-11" />
      <CarouselNext className="right-11" />
    </Carousel>
  );
};
