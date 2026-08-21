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

export default function Trending() {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    async function getTrending() {
      const response = await fetch(
        "/api/tv/trending");
      const data = await response.json();
      setShows(data.results || []);
    }
    getTrending();
  }, []);

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