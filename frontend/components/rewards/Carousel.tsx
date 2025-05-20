"use client";

import { useState, useRef } from "react";
import { NextPage } from "next";
import { CarouselProps } from "@/types/props";
import Card from "./Card";

const Carousel: NextPage<CarouselProps> = ({ items }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Set up event handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    setIsDragging(true);

    // Handle both mouse and touch events
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    setStartX(clientX);

    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging) return;

    // Handle both mouse and touch events
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    const distance = (clientX - startX) * 1.5; // Multiply by factor for faster drag

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - distance;
    }
  };

  const handleDragEnd = (): void => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide py-2 px-4 gap-4 2xl:justify-around"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove as React.MouseEventHandler}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove as React.TouchEventHandler}
        onTouchEnd={handleDragEnd}
      >
        {items.map((item, idx) => (
          <Card key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
