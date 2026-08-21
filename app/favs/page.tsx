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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch("/api/favorites");

        if (!response.ok) {
          let errorMessage = `Request failed with status ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData?.error) errorMessage = errorData.error;
          } catch {

          }
          throw new Error(errorMessage);
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


  const handleRemove = (tmdbId: number) => {
    setFavorites((current) => current.filter((item) => item.tmdbId !== tmdbId));
  };

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
  <section className="min-h-screen bg-black">
    <h1 className="px-4 pt-5 text-3xl font-bold text-yellow-400 sm:px-6">
      Favorites List
    </h1>

    {favorites.length === 0 ? (
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
        {favorites.map((item) => (
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