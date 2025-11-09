"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/axios-instance";
import { Play, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
    <Carousel className="w-full">
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
      <div className="left-[140px] top-[178px] absolute inline-flex flex-col justify-start items-start gap-4 w-[400px]">
        <div>
          <p className="text-white text-base font-normal leading-6">
            Now Playing:
          </p>
          <h1 className="text-white text-4xl font-bold leading-10">Wicked</h1>
        </div>
        <div className="flex items-center gap-0.5">
          <Star size={28} strokeWidth={0} fill="#FDE047" />
          <div className="flex items-center">
            <p className="text-neutral-50 text-lg font-semibold leading-7">
              6.9
            </p>
            <p className="text-neutral-50 opacity-50 text-base font-normal leading-6">
              /10
            </p>
          </div>
        </div>
        <p className="text-neutral-50 text-s font-normal leading-5">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.
        </p>
        <Button variant="outline">
          <Play />
          <p>Watch Trailer</p>
        </Button>
      </div>
    </Carousel>
  );
};
