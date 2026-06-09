import LoginDropdown from "@/components/LoginDropdown";
import RegisterDropdown from "@/components/RegisterDropdown";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import Body from "@/components/Body";


export default function Home() {
    return (
      <>
      <main className="bg-yellow-400">
          <h1 className="border-b-5 h-15 flex justify-center items-center bg-yellow-400 text-black text-5xl">The Pilot</h1>
          <div className="flex bg-yellow-400 gap-6 h-16">
              <div className="flex gap-1 ml-auto">
                  <SearchBar />
                  <LoginDropdown />
                  <RegisterDropdown />
              </div>
          </div>
          <h1 className="flex text-red-600 justify-center">Home</h1>
          <Body />
      </main>
          <section className="mt-auto">
               <Footer />
          </section>
      </>
  )
};