import Link from "next/link";
import { cookies } from "next/headers"; //check user's browser cookies before sending back protected routes or API response

import SearchBar from "@/components/navigation/SearchBar";
import AccountButton from "@/components/auth/AccountButton";
import AccountDropdownButton from "@/components/auth/AccountDropdownButton";
import { prisma } from "@/lib/prisma";  //allows app to access database on backend



export default async function MainNav() {  //declares/exports a server component function with destructuring and Typescript typing
  const cookieStore = await cookies();  //fetches cookie store
  const userId = cookieStore.get("userId")?.value;
  const isLoggedIn = Boolean(userId);

  const user = userId ? await prisma.user.findUnique({  //ternary operator. If userID exist, finds that table and selects name, if doesn't exist returns null
          where: {
              id: userId,
          },
          select: {
              name: true,
          },
      })
      : null;

  return (
  <header
    className="
      grid grid-cols-1 items-center gap-4
      bg-yellow-400 px-4 py-4
      md:grid-cols-[auto_1fr_auto]
      lg:grid-cols-[225px_auto_minmax(0,1fr)_auto]
      lg:px-5
    "
  >
    <div className="flex justify-center md:justify-start">
      <h1
        className="
          flex h-16 w-full max-w-[225px] items-center justify-center
          rounded-lg bg-black text-2xl text-yellow-400
          lg:h-20 lg:text-3xl
        "
      >
        TV Fanatic
      </h1>
    </div>

    <nav className="flex flex-wrap items-center justify-center gap-5">
      <Link
        href="/"
        className="text-lg text-black transition-colors hover:text-gray-700"
      >
        Trending
      </Link>

      <Link
        href="/top-rated"
        className="text-lg text-black transition-colors hover:text-gray-700"
      >
        Top Rated
      </Link>
    </nav>

    <div
      className="
        flex w-full justify-center
        md:col-span-3 md:row-start-2
        lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:justify-end
      "
    >
      <SearchBar />
    </div>

    <div
      className="
        flex items-center justify-center
        md:col-start-3 md:row-start-1 md:justify-end
        lg:col-start-4
      "
    >
      {isLoggedIn ? (
        <AccountDropdownButton name={user?.name ?? "user"} />
      ) : (
        <AccountButton />
      )}
    </div>
  </header>
) }