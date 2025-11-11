import Image from "next/image";

type MovieImageProps = {
  backdrop_path: string;
  title: string;
  className: string;
};

export const MovieImage = ({
  backdrop_path,
  title,
  className,
}: MovieImageProps) => {
  const imgUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL}/original${backdrop_path}`;

  return (
    <Image
      src={imgUrl}
      width={500}
      height={500}
      alt={title}
      className={className}
      style={{ objectFit: "cover" }}
      loading="eager"
    />
  );
};
