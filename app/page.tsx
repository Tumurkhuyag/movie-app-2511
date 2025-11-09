import { Slides } from "@/components/carousel/Slides";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <div>
      <div className="h-16 flex items-center">
        <Header />
      </div>
      <Slides />
    </div>
  );
}
