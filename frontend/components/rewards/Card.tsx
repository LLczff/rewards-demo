"use client";

import { DealCard } from "@/types";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Coin from "@/components/Coin";
import Image from "next/image";

const Card: NextPage<DealCard> = (props) => {
  const router = useRouter();

  return (
    <div
      className="group flex-shrink-0"
      onClick={() => router.push(`/deal/${props._id}`)}
    >
      <div
        className={`relative h-full w-64 cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300 transform group-hover:shadow-lg group-hover:-translate-y-1`}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            priority
            src={props.image}
            alt={props.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 no-drag rounded-lg"
          />
        </div>
        <div className="px-4 pt-4 pb-10">
          <h3 className="text-lg font-semibold text-gray-700">{props.title}</h3>
        </div>
        <div className="absolute flex gap-1 items-center bottom-1 right-3">
          <Coin size={12} />
          <span className="text-amber-500 font-semibold">{props.cost}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
