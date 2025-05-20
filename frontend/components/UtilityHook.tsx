"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

const UtilityHook = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const createMultiQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.append(name, value); // add value no matter it's duplicate
      return params.toString();
    },
    [searchParams]
  );

  return {
    createQueryString,
    createMultiQueryString,
  };
};

export default UtilityHook;
