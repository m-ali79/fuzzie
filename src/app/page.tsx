import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 h-[70rem] bg-neutral-950 text-white">
        <div className="flex flex-col justify-center items-center gap-y-14">
          <Button
            size={"lg"}
            className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
              Start For Free Today
            </span>
          </Button>
          <h1 className="text-center text-5xl font-sans font-bold text-clip text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
            Automate Your Work With Fuzzie
          </h1>
        </div>
      </section>
    </main>
  );
}
