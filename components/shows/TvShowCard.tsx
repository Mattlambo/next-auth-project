"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Show = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
};

type ShowDetails = {
  last_air_date: string | null;
  number_of_seasons: number;
};

type ShowCardProps = {
  show: Show;
};

export default function ShowCard({ show }: ShowCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [details, setDetails] = useState<ShowDetails | null>(null);

  const year = show.first_air_date?.slice(0, 4) || "Unknown";
  const rating = show.vote_average > 0 ? show.vote_average.toFixed(1) : "NR";
  const endYear = details?.last_air_date?.slice(0, 4) || "Present";
  const seasons = details?.number_of_seasons;

  useEffect(() => {
    async function getDetails() {
      const response = await fetch(`/api/tv/details?id=${show.id}`);
      const data = await response.json();

      setDetails(data);
    }

    getDetails();
  }, [show.id]);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="
        relative flex h-[450px] w-[220px] cursor-pointer flex-col
        overflow-hidden rounded-xl border border-yellow-400 bg-neutral-950 p-2 text-white
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/30 m-5
      "
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute right-3 top-3 z-10 text-2xl transition hover:scale-110"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-white" />
        )}
      </button>

      <div className="absolute left-3 top-3 z-10">
        <p className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
          {rating}
        </p>
      </div>

      {!isFlipped ? (
        <>
          <div className="mt-12 overflow-hidden rounded">
            {show.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                alt={show.name}
                className="h-[280px] w-full object-cover transition-transform duration-200 hover:scale-105"
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
        <div className="mt-12 overflow-y-auto p-2 text-sm leading-relaxed flex flex-col">
          <span className="flex justify-center text-yellow-400 text-lg border-b border-yellow-400">{show.name}</span>


          <span className="bg-yellow-400 text-black flex justify-center rounded-lg mt-2">
          {seasons} {seasons === 1 ? "Season" : "Seasons"}
          </span>
           <span className="flex justify-center bg-yellow text-black mb-2 text-sm text-gray-300 p-2">
              {year} - {endYear}
            </span>

          {show.overview || "No overview available."}


        </div>
      )}
    </div>
  );
}