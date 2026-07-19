"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative"
    >
      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
      />

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search TV shows..."
        className="border bg-black rounded-xl pl-12 pr-4 py-2 w-96 text-yellow-400 text-lg"
      />
    </form>
  );
}