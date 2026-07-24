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
        {isLoggedIn ? <AccountDropdownButton name={user?.name ?? "user"} /> : <AccountButton />}
      </div>
    </div>
  );
}  //like an if else statement. ternary operator. condition ? ifTrue :ifFalse