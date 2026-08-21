"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaTv } from "react-icons/fa";
import Image from "next/image";




export type ShowCardItem = {
  id: number | string;
  tmdbId?: number;
  name: string;
  overview: string | null;
  poster_path?: string | null;
  posterPath?: string | null;
  first_air_date?: string | null;
  firstAirDate?: string | null;
  vote_average?: number | null;
  voteAverage?: number | null;
};

type ShowDetails = {
  last_air_date: string | null;
  number_of_seasons: number;
};

type ShowCardProps = {
  show: ShowCardItem;
  onRemoveFromWatching?: (tmdbId: number) => void;
  onRemoveFromFavorite?: (tmdbId: number) => void;
};

export default function ShowCard({
  show,
  onRemoveFromWatching,
  onRemoveFromFavorite,
}: ShowCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const router = useRouter();

  // Favorite states
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);

  // Watching states
  const [isWatching, setIsWatching] = useState(false);
  const [isSavingWatching, setIsSavingWatching] = useState(false);

  const [details, setDetails] = useState<ShowDetails | null>(null);

  // Normalize properties between API camelCase and snake_case models
  const tmdbId =
    show.tmdbId ??
    (typeof show.id === "number" ? show.id : parseInt(show.id, 10));
  const posterPath = show.poster_path ?? show.posterPath;
  const firstAirDate = show.first_air_date ?? show.firstAirDate;
  const voteAverage = show.vote_average ?? show.voteAverage ?? 0;

  const year = firstAirDate?.slice(0, 4) || "Unknown";
  const rating = voteAverage > 0 ? voteAverage.toFixed(1) : "NR";
  const endYear = details?.last_air_date?.slice(0, 4) || "Present";
  const seasons = details?.number_of_seasons;

  useEffect(() => {
    if (!tmdbId || isNaN(tmdbId)) return;

    async function getDetails() {
      try {
        const response = await fetch(`/api/tv/details?id=${tmdbId}`);
        if (!response.ok) return;
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error("Unable to fetch show details:", err);
      }
    }

    getDetails();
  }, [tmdbId]);

  // Check initial favorite and watching statuses
  useEffect(() => {
    if (!tmdbId || isNaN(tmdbId)) return;

    async function checkStatus() {
      try {
        const [favRes, watchRes] = await Promise.all([
          fetch(`/api/favorites?tmdbId=${tmdbId}`),
          fetch(`/api/watching?tmdbId=${tmdbId}`),
        ]);

        if (favRes.ok) {
          const favData = await favRes.json();
          setIsFavorite(favData.isFavorite);
        }

        if (watchRes.ok) {
          const watchData = await watchRes.json();
          setIsWatching(watchData.isWatching);
        }
      } catch (error) {
        console.error("Unable to check status:", error);
      }
    }

    checkStatus();
  }, [tmdbId]);

  async function handleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isSavingFavorite) return;
    setIsSavingFavorite(true);

    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId,
          name: show.name,
          posterPath,
          overview: show.overview,
          firstAirDate,
          voteAverage,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/account");
        router.refresh();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to update favorite status.");
      }

      const nextFavoriteState = !isFavorite;
      setIsFavorite(nextFavoriteState);

      // Trigger cleanup callback if removed from favorites while on FavoritesPage
      if (!nextFavoriteState && onRemoveFromFavorite) {
        onRemoveFromFavorite(tmdbId);
      }
    } catch (error) {
      console.error("Favorite error:", error);
    } finally {
      setIsSavingFavorite(false);
    }
  }

  async function handleWatching(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isSavingWatching) return;
    setIsSavingWatching(true);

    try {
      const response = await fetch("/api/watching", {
        method: isWatching ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId,
          name: show.name,
          posterPath,
          overview: show.overview,
          firstAirDate,
          voteAverage,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/account");
        router.refresh();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to update watching status.");
      }

      const nextWatchingState = !isWatching;
      setIsWatching(nextWatchingState);

      // If removed from watching while on the WatchingPage, trigger parent cleanup
      if (!nextWatchingState && onRemoveFromWatching) {
        onRemoveFromWatching(tmdbId);
      }
    } catch (error) {
      console.error("Watching error:", error);
    } finally {
      setIsSavingWatching(false);
    }
  }

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="
        relative m-5 flex h-[450px] w-[220px] cursor-pointer flex-col
        overflow-hidden rounded-xl border border-yellow-400 bg-neutral-950 p-2 text-white
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/30
      "
    >
      <div className="absolute left-3 top-3 z-10">
        <p className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
          {rating}
        </p>
      </div>

      {!isFlipped ? (
        <>
          <div className="mt-12 overflow-hidden rounded">
            {posterPath ? (
              <Image
                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                alt={show.name}
                width={500}
                height={750}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 250px"
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            ) : (
              <div className="flex h-[280px] items-center justify-center bg-neutral-800 text-sm text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="flex h-24 flex-col items-center justify-center text-center">
            <h3 className="line-clamp-2 text-yellow-400">{show.name}</h3>
          </div>
        </>
      ) : (
        <div className="mt-12 flex flex-col overflow-y-auto p-2 text-sm leading-relaxed">
          <span className="flex justify-center border-b border-yellow-400 text-lg text-yellow-400">
            {show.name}
          </span>

          <span className="mt-2 flex justify-center rounded-lg bg-yellow-400 text-black">
            {seasons} {seasons === 1 ? "Season" : "Seasons"}
          </span>
          <span className="mb-2 flex justify-center p-2 text-sm text-gray-300">
            {year} - {endYear}
          </span>

          {show.overview || "No overview available."}

          {/* Watching Toggle Button */}
          <button
            type="button"
            onClick={handleWatching}
            disabled={isSavingWatching}
            aria-label={isWatching ? "Remove from watching" : "Add to watching"}
            className="
              absolute right-12 top-3 z-10 cursor-pointer text-2xl
              transition hover:scale-110
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            <FaTv className={isWatching ? "text-yellow-400" : "text-white"} />
          </button>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={handleFavorite}
            disabled={isSavingFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="
              absolute right-3 top-3 z-10 cursor-pointer text-2xl
              transition hover:scale-110
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-white" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}