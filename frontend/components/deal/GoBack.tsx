"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const GoBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="absolute cursor-pointer top-2 left-1"
    >
      <IoChevronBack className="text-3xl" />
    </button>
  );
};

export default GoBack;
