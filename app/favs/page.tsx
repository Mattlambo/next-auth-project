"use client";

import { useEffect, useState } from "react";
import ShowCard from "@/components/shows/TvShowCard";

type Favorite = {
  id: string;
  tmdbId: number;
  name: string;
  overview: string | null;
  posterPath: string | null;
  firstAirDate: string | null;
  voteAverage: number | null;
};

type Show = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch("/api/favorites");

        if (!response.ok) {
          const errorData = await response.json();

          throw new Error(
            errorData.error ||
              `Request failed with status ${response.status}`
          );
        }

        const data: Favorite[] = await response.json();

        setFavorites(data);
      } catch (error) {
        console.error("Favorites page error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your favorites."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  const shows: Show[] = favorites.map((favorite) => ({
    id: favorite.tmdbId,
    name: favorite.name,
    overview: favorite.overview ?? "No overview available.",
    poster_path: favorite.posterPath,
    first_air_date: favorite.firstAirDate ?? "",
    vote_average: favorite.voteAverage ?? 0,
  }));

  if (isLoading) {
    return (
      <p className="p-8 text-center text-yellow-400">
        Loading favorites...
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
    <section className="min-h-screen bg-black px-6 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-yellow-400">
        My Favorites
      </h1>

      {shows.length === 0 ? (
        <p className="text-center text-gray-300">
          You have not added any favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
            />
          ))}
        </div>
      )}
    </section>
  );
}