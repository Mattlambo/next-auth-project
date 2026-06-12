import Navbar from "@/components/Navbar";
import Body from "@/components/Body";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Account() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId.value,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <main className="bg-yellow-400">
        <h1 className="border-b-5 h-15 flex justify-center items-center bg-yellow-400 text-black text-5xl">
          The Pilot
        </h1>

        <Navbar />

        <h1 className="flex justify-end mr-5 text-lg">
          {user.email}
        </h1>

        <Body />
      </main>

      <Footer />
    </>
  );
}