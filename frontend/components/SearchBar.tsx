"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UtilityHook from "@/components/UtilityHook";
import { FaMagnifyingGlass } from "react-icons/fa6";

const searchLabel = "search";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = UtilityHook();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  const handleSearch = () => {
    const notEmptySearch = searchTerm.trim();
    if (notEmptySearch)
      router.push("/deal?" + createQueryString("search", notEmptySearch));
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <search>
      <label
        htmlFor={searchLabel}
        className="flex h-full w-full px-3 py-2 rounded-full border border-primary gap-2 max-w-[768px] mx-auto"
      >
        <FaMagnifyingGlass className="text-primary" />
        <input
          id={searchLabel}
          name={searchLabel}
          type="text"
          placeholder="Search for deals"
          value={searchTerm}
          autoComplete="off"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
          className="text-sm focus:outline-none w-full caret-primary text-slate-600 placeholder:text-slate-300"
        />
      </label>
    </search>
  );
};

export default SearchBar;
