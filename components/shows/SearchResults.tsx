"use client";

import ShowCard from "@/components/shows/TvShowCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Show = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  last_air_date: number;
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    if (!query) return;

    async function getShows() {
      const response = await fetch(
        `/api/tv/search?query=${encodeURIComponent(query!)}`
      );

      const data = await response.json();

      setShows(data.results || []);
    }

    getShows();
  }, [query]);

  return (
  <section>
    <h1 className="px-4 pt-5 text-3xl text-yellow-400 sm:px-6">
      Trending
    </h1>

    <div
      className="
        grid grid-cols-2 gap-3 px-4 py-6
        sm:grid-cols-3 sm:px-6
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      "
    >
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  </section>
)}