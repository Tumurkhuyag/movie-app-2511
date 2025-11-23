import { Slides } from "@/components/carousel/Slides";
import { Header } from "@/components/header/Header";
import { CategorySection } from "@/components/movie/CategorySection";
import { CATEGORIES } from "./_constants";

export default function Home() {
  return (
    <div className="">
      <Slides />
      {CATEGORIES.map(({ name, value }) => (
        <CategorySection
          key={value}
          categoryName={name}
          categoryValue={value}
        />
      ))}
    </div>
  );
}
