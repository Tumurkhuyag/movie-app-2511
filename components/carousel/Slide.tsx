import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Play, Star } from "lucide-react";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { MovieImage } from "../common/MovieImage";

export const Slide = ({ movie }: { movie: MovieDetail }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance(
        `movie/${movie.id}/videos?language=en-US`
      );
      // data.results array -ийн зарим элементүүд хоосон байгаагаас болоод key undefined байж болохгүй гэсэн алдаа зааж байгаа.
      // console.log(data.results[0].key);
      setVideoUrl(data.results[0]?.key);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-[600] relative">
      <MovieImage
        backdrop_path={movie.backdrop_path}
        title={movie.title}
        className="h-full w-full"
      />
      {/* Эндээс слайд дээр харуулах контендуудийн бичиглэл явж байгаа */}
      <div className="left-[140px] top-[178px] absolute inline-flex flex-col justify-start items-start gap-4 w-[400px]">
        <div>
          <p className="text-white text-base font-normal leading-6">
            Now Playing:
          </p>
          <h1 className="text-white text-4xl font-bold leading-10">
            {movie.title}
          </h1>
        </div>
        <div className="flex items-center gap-0.5">
          <Star size={28} strokeWidth={0} fill="#FDE047" />
          <div className="flex items-center">
            <p className="text-neutral-50 text-lg font-semibold leading-7">
              {/* imgUrl дээр зураг орж ирэхдээ 20 слайд тус бүр дэрэ орж ирсэн мөртлөө энд яагаад нэг слайд дээр бүх оноонууд орж ирээд байгааг ойлгодоггүй */}

              {movie.vote_average}
            </p>
            <p className="text-neutral-50 opacity-50 text-base font-normal leading-6">
              /10
            </p>
          </div>
        </div>
        <p className="text-neutral-50 text-s font-normal leading-5">
          {movie.overview}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Play />
              <p>Watch Trailer</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[full] sm:max-w-fit">
            <DialogHeader>
              <DialogTitle>{movie.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* Render a YouTube video player */}
              <ReactPlayer
                width={1080}
                height={608}
                src={`https://www.youtube.com/watch?v=${videoUrl}`}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
