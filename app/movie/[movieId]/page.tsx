"use client";

import { axiosInstance } from "@/lib/axios-instance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

      //   console.log(data);
      setMovieDetails(data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.movipeId]);

  console.log(movieDetails);
  return (
    <div className="w-full max-w-7xl m-auto">
      <div className="w-full flex items-center justify-between mb-8">
        <div className="text-4xl font-bold leading-10">
          {movieDetails?.title}
        </div>
      </div>
    </div>
  );
};

export default CategorySectionDetail;
