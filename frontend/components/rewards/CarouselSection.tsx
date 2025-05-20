import { NextPage } from "next";
import Carousel from "./Carousel";
import { CarouselSectionProps } from "@/types/props";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

const CarouselSection: NextPage<CarouselSectionProps> = ({ title, items }) => {
  return (
    <section className="py-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-secondary font-medium text-2xl">{title}</h2>
        <Link
          href="/deal"
          className="rounded-full bg-primary w-fit p-1 aspect-square"
        >
          <IoArrowForward size={24} color="#fff" />
        </Link>
      </div>
      <Carousel items={items} />
    </section>
  );
};

export default CarouselSection;
