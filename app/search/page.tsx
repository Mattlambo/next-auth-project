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

export default function SearchPage() {
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
    <>

            <h1 className="flex justify-start text-yellow-400 text-3xl ml-5 mb-10 mt-5">
        Search Results
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-6">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>

    </>
  );
}