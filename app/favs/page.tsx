import Navbar from "@/components/Navbar";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

export default function Account()  {
    return (
        <>
        <main className="bg-yellow-400">
          <h1 className="border-b-5 h-15 flex justify-center items-center bg-yellow-400 text-black text-5xl">The Pilot</h1>
            <Navbar />
             <h1 className="flex text-red-600 justify-center">Favorites</h1>
            <Body />
        </main>
            <Footer/>
        </>
    )
}