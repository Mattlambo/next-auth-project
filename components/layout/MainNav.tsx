import Link from "next/link";
import { cookies } from "next/headers";

import SearchBar from "@/components/navigation/SearchBar";
import AccountButton from "@/components/auth/AccountButton";
import AccountDropDown from "@/components/auth/AccountDropdown";

export default async function MainNav() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const isLoggedIn = Boolean(userId);

  return (
    <div className="grid h-30 grid-cols-[225px_auto_1fr_auto] items-center gap-8 border-b-3 border-black bg-yellow-400 px-5">
      <div>
        <h1 className="ml-5 flex h-20 w-45 items-center justify-center rounded-lg bg-black text-3xl text-yellow-400">
          TV Fanatic
        </h1>
      </div>

      <div className="ml-10 flex items-center gap-4">
        <Link
          href="/top-rated"
          className="text-lg text-black hover:text-2xl"
        >
          Top Rated
        </Link>

        <Link
          href="/"
          className="text-lg text-black hover:text-2xl"
        >
          Trending
        </Link>

        <Link
          href="/discover"
          className="text-lg text-black hover:text-2xl"
        >
          Discover
        </Link>
      </div>

      <div className="flex justify-end">
        <SearchBar />
      </div>

      <div className="flex items-center">
        {isLoggedIn ? <AccountDropDown /> : <AccountButton />}
      </div>
    </div>
  );
}