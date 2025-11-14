import { Slides } from "@/components/carousel/Slides";
import { Header } from "@/components/header/Header";
import { CategorySection } from "@/components/movie/CategorySection";

const categories = [
  { name: "Upcoming", value: "upcoming" },
  { name: "Popular", value: "popular" },
  { name: "Top rated", value: "top_rated" },
];

export default function Home() {
  return (
    <div className="">
      <Header />
      <Slides />
      {categories.map(({ name, value }) => (
        <CategorySection
          key={value}
          categoryName={name}
          categoryValue={value}
        />
      ))}
    </div>
  );
}
