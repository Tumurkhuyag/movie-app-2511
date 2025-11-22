"use client";

import { MovieImage } from "@/components/common/MovieImage";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios-instance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Star, User, Play } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const CategorySectionDetail = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axiosInstance(
        `/movie/${params.movieId}?language=en-US`
      );

      console.log(data);
      setMovieDetails(data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.movieId]);

  const hours = movieDetails ? Math.floor(movieDetails.runtime / 60) : 0;
  const mins = movieDetails ? movieDetails.runtime % 60 : 0;

  return (
    <div className="w-full max-w-7xl m-auto">
      <Header />
      <div className="w-full max-w-[1080px] m-auto mt-[52px]">
        <div className="w-full flex items-end justify-between mb-8">
          <div>
            <div className="text-4xl font-bold leading-10">
              {movieDetails?.title}
            </div>
            <div className="flex">
              <p>
                {movieDetails?.release_date} · PG · {hours}h {mins}m
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <Star size={28} strokeWidth={0} fill="#FDE047" />
            <div className="flex items-center">
              <p className="text-foreground text-lg font-semibold leading-7">
                {Number(movieDetails?.vote_average).toFixed(1)}
              </p>
              <p className="text-muted-foreground text-base font-normal leading-6">
                /10 (
              </p>
              <User size={15} className="text-muted-foreground" />
              <p className="text-muted-foreground text-base font-normal leading-6">
                {movieDetails?.vote_count})
              </p>
            </div>
          </div>
        </div>
        <div className="h-[428px] flex gap-8">
          <MovieImage
            backdrop_path={movieDetails?.poster_path ?? ""}
            title={movieDetails?.title ?? ""}
            className="aspect-2/3 max-w-[290px]"
          />
          <div className="w-full relative">
            <MovieImage
              backdrop_path={movieDetails?.backdrop_path ?? ""}
              title={movieDetails?.title ?? ""}
              className="w-full"
            />

            <Dialog>
              <DialogTrigger asChild>
                <div className="left-6 bottom-6 z-10 absolute inline-flex flex-row gap-3 justify-end items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full">
                    <Play size={16} />
                  </Button>
                  <p className="text-primary-foreground">Play trailer</p>
                  <p className="text-primary-foreground">2:35</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[full] sm:max-w-fit">
                <DialogHeader>
                  <DialogTitle>hello</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* Render a YouTube video player */}
                  <ReactPlayer
                    width={1080}
                    height={608}
                    src={`https://www.youtube.com/watch?v=`}
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySectionDetail;
