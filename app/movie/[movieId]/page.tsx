"use client";

import { MovieImage } from "@/components/common/MovieImage";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios-instance";
import { Star, User, Play, ArrowRight } from "lucide-react";
import ReactPlayer from "react-player";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CategorySection } from "@/components/movie/CategorySection";
import Link from "next/link";
import { MovieCard } from "@/components/cards/MovieCard";

const CategorySectionDetail = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [movieCredits, setMovieCredits] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [trailerVideoURL, setTrailerVideoURL] = useState("");
  const [similarMoviesSection, setSimilarMoviesSection] =
    useState<MovieDetail[]>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: movieInfo } = await axiosInstance(
        `/movie/${params.movieId}?language=en-US`
      );

      const { data: trailerVideo } = await axiosInstance(
        `/movie/${params.movieId}/videos?language=en-US`
      );

      const { data: movieCredit } = await axiosInstance(
        `/movie/${params.movieId}/credits?language=en-US`
      );

      const { data: similarMovies } = await axiosInstance(
        `/movie/${params.movieId}/similar?language=en-US&page=1`
      );

      //   console.log(similarMovies.results);
      setMovieDetails(movieInfo);
      setTrailerVideoURL(trailerVideo?.results[0]?.key);
      setMovieCredits(movieCredit);
      setSimilarMoviesSection(similarMovies.results);
      setIsLoading(false);
    };
    fetchData();
  }, [params.movieId]);

  const hours = movieDetails ? Math.floor(movieDetails.runtime / 60) : 0;
  const mins = movieDetails ? movieDetails.runtime % 60 : 0;

  return (
    <div className="w-full max-w-7xl m-auto">
      <div className="w-full max-w-[1080px] flex flex-col gap-8 m-auto mt-[52px]">
        <div className="w-full flex items-end justify-between">
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

        <div className="h-[428px] flex gap-12">
          <MovieImage
            backdrop_path={movieDetails?.poster_path ?? ""}
            title={movieDetails?.title ?? ""}
            className="aspect-2/3 max-w-[290px] rounded-md"
          />
          <div className="w-full relative">
            <MovieImage
              backdrop_path={movieDetails?.backdrop_path ?? ""}
              title={movieDetails?.title ?? ""}
              className="w-full h-full rounded-md"
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
                  <DialogTitle>{movieDetails?.title} - Trailer</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* Render a YouTube video player */}
                  <ReactPlayer
                    width={1080}
                    height={608}
                    src={`https://www.youtube.com/watch?v=${trailerVideoURL}`}
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-3">
            {movieDetails?.genres.map(({ name, id }) => (
              <Badge key={id} variant="outline">
                {name}
              </Badge>
            ))}
          </div>

          <p>{movieDetails?.overview}</p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex gap-[53px]">
                <div className="flex w-16 font-bold">
                  <p>Director</p>
                </div>

                <div className="flex flex-wrap gap-5">
                  {(movieCredits?.crew as any[] | undefined)
                    ?.filter((c: any) => c.job === "Director")
                    .map(({ id, name }: any) => (
                      <p key={id} className="font-regular">
                        {name}
                      </p>
                    ))}
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-[53px]">
                <div className="flex w-16 font-bold">
                  <p>Writers</p>
                </div>

                <div className="flex flex-wrap gap-5">
                  {(movieCredits?.crew as any[] | undefined)
                    ?.filter((c: any) => c.job === "Writer")
                    .map(({ id, name }: any) => (
                      <p key={id} className="font-regular">
                        {name}
                      </p>
                    ))}
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="flex flex-col">
              <div className="flex gap-[53px]">
                <div className="flex w-16 font-bold">
                  <p>Stars</p>
                </div>

                <div className="flex flex-wrap gap-5">
                  {(movieCredits?.cast as any[] | undefined)
                    ?.slice(0, 5)
                    .map(({ id, name }: any) => (
                      <p key={id} className="font-regular">
                        {name}
                      </p>
                    ))}
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl m-auto mt-14 mb-14">
          <div className="w-full flex items-center justify-between mb-8">
            <p className="text-2xl font-semibold items-center">
              More like this
            </p>
            {/* {console.log(categoryValue)} */}
            <Link rel="preload" href={`/category/`}>
              <Button variant="ghost">
                <p>See more</p>
                <ArrowRight />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-5 grid-rows-1 gap-8">
            {similarMoviesSection?.slice(0, 5).map((movie) => {
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
      </div>
    </div>
  );
};

export default CategorySectionDetail;
