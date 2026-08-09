import { Suspense } from "react";
import SearchResults from "@/components/shows/SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}