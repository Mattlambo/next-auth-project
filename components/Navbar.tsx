import Link from "next/link";
import Logout from "./logout"
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center text-black text-lg bg-yellow-400 w-full h-16">
      {/* 1. Left Spacer (Empty to balance the grid) */}
      <div></div>

      {/* 2. Centered Links */}
      <div className="flex justify-center items-center gap-5">
        <Link href="/">Home</Link>
        <Link href="/account">Account</Link>
        <Link href="/watching">Watching</Link>
        <Link href="/favs">Favorites</Link>
      </div>

      {/* 3. Right Aligned Logout Button */}
      <div className="flex justify-end items-center">
          <SearchBar />
          <Logout />
      </div>
    </div>
  );
}