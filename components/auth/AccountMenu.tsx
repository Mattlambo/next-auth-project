"use client";
import Link from "next/link";
import Logout from "@/components/auth/Logout";

export default function AccountMenu() {
    return (
        <div className="w-48 overflow-hidden rounded-lg border border-yellow-400 bg-black shadow-xl">
  <Link
    href="/watching"
    className="block w-full px-4 py-3 text-left text-yellow-400 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
  >
    Watching
  </Link>

  <Link
    href="/favs"
    className="block w-full px-4 py-3 text-left text-yellow-400 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
  >
    Favorites
  </Link>

  <div className="border-t border-yellow-400/40" />

  <Link
    href="/account"
    className="block w-full px-4 py-3 text-left text-yellow-400 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
  >
    Account Info
  </Link>

  <Link
    href="/settings"
    className="block w-full px-4 py-3 text-left text-yellow-400 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
  >
    Settings
  </Link>
          <Logout />

</div>

    )
}