"use client";

import { useEffect, useState } from "react";
import ShowCard from "@/components/shows/TvShowCard";


type Watching = {
  id: string;
  tmdbId: number;
  name: string;
  overview: string | null;
  posterPath: string | null;
  firstAirDate: string | null;
  voteAverage: number | null;
};

export default function WatchingPage() {
  const [watching, setWatching] = useState<Watching[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWatching() {
      try {
        const response = await fetch("/api/watching");

        if (!response.ok) {
          let errorMessage = `Request failed with status ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData?.error) errorMessage = errorData.error;
          } catch {
            // fallback if JSON parse fails
          }
          throw new Error(errorMessage);
        }

        const data: Watching[] = await response.json();
        setWatching(data);
      } catch (err) {
        console.error("Watching page error:", err);
        setError(
          err instanceof Error ? err.message : "Unable to load watching list"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadWatching();
  }, []);

  const handleRemove = (tmdbId: number) => {
    setWatching((current) => current.filter((item) => item.tmdbId !== tmdbId));
  };

  if (isLoading) {
    return (
      <p className="p-8 text-center text-yellow-400">
        Loading watching list...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-500">
        {error}
      </p>
    );
  }
return (
  <section className="min-h-screen bg-black">
    <h1 className="px-4 pt-5 text-3xl font-bold text-yellow-400 sm:px-6">
      Watching List
    </h1>

    {watching.length === 0 ? (
      <p className="px-4 py-8 text-center text-gray-300 sm:px-6">
        You have not added any shows to your watching list.
      </p>
    ) : (
      <div
        className="
          grid grid-cols-2 gap-3 px-4 py-6
          sm:grid-cols-3 sm:px-6
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {watching.map((item) => (
          <ShowCard
            key={item.id}
            show={{
            id: item.tmdbId,
            name: item.name,
            overview: item.overview ?? "",
            poster_path: item.posterPath,
            first_air_date: item.firstAirDate ?? '',
            vote_average: item.voteAverage ?? 0,
            }}
            onRemoveFromWatching={handleRemove}
          />
        ))}
      </div>
    )}
  </section>
)}
