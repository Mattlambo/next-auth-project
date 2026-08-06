"use client";

import ShowCard from "@/components/shows/TvShowCard";
import { useEffect, useState } from "react";

type Show = {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
};

export default function TopRated() {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        async function getTopRated() {
            const response = await fetch(
                "api/tv/toprated");
            const data = await response.json();
            setShows(data.results || []);
        }

        getTopRated();
    }, []);

      return (
    <>
      <h1 className="flex justify-start text-yellow-400 text-3xl ml-5 mb-10 mt-5">Top Rated</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-6">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </>
  );
}

