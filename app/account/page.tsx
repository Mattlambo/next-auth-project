import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Trending from "@/components/shows/Trending";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="flex-1 bg-black p-6 text-white">
      <h1 className="mb-2 text-3xl text-yellow-400">
        Welcome, {user.name}
      </h1>



      <Trending />
    </main>
  );
}