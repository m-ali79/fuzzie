import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/landing/scroll-animation";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/landing/infinite-moving-cards";
import { HeroParallax } from "@/components/landing/hero-parallex";
import { LampDemo } from "@/components/landing/lamp";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/landing/3d-card";
import { Check } from "lucide-react";

const products = [
  { title: "cursor", link: "cursor.so", thumbnail: "/p1.png" },
  { title: "shadcn", link: "cursor.so", thumbnail: "/p2.png" },
  { title: "github", link: "cursor.so", thumbnail: "/p3.png" },
  { title: "copilot", link: "cursor.so", thumbnail: "/p4.png" },
  { title: "ts", link: "cursor.so", thumbnail: "/p5.png" },
  { title: "next", link: "cursor.so", thumbnail: "/p6.png" },
];

const cards = [
  {
    name: "Hobby",
    price: "$0",
    description:
      "Get a glimpse of what our software is capable of. Just a heads up you'll never leave us after this!",
    features: ["3 Free automations", "100 tasks per month", "Two-step Actions"],
  },
  {
    name: "Pro Plan",
    price: "$29",
    description:
      "Get a glimpse of what our software is capable of. Just a heads up you'll never leave us after this!",
    features: ["3 Free automations", "100 tasks per month", "Two-step Actions"],
  },
  {
    name: "Unlimited",
    price: "$99",
    description:
      "Get a glimpse of what our software is capable of. Just a heads up you'll never leave us after this!",
    features: ["3 Free automations", "100 tasks per month", "Two-step Actions"],
  },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="py-20  bg-neutral-950 h-[55rem] text-white">
        <div className="flex flex-col justify-center items-center  px-[5rem] mt-20">
          <Button
            size={"lg"}
            className="p-8 mb-8 md:mb-0  md:text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
              Start For Free Today
            </span>
          </Button>

          <ContainerScroll
            titleComponent={
              <h1 className="text-center text-3xl md:text-8xl font-sans font-bold text-clip text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                Automate Your Work With Fuzzie
              </h1>
            }
          >
            <Image
              src={"/temp-banner.png"}
              alt="background banner"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </ContainerScroll>
        </div>
      </section>

      <section className="bg-neutral-950 text-white pt-[30rem] h-full px-[6rem] flex flex-col gap-10 justify-center items-center">
        <div className="w-full h-full max-w-min mx-auto">
          {" "}
          <InfiniteMovingCards
            direction="left"
            pauseOnHover
            speed="fast"
            className="-mt-[15rem]"
            items={[
              "1.png",
              "2.png",
              "3.png",
              "4.png",
              "5.png",
              "6.png",
              "7.png",
              "8.png",
              "9.png",
              "10.png",
            ]}
          />
          <HeroParallax products={products} />
        </div>
      </section>

      <section className="bg-neutral-950 text-white">
        <LampDemo />
        <div className="flex flex-wrap gap-10 items-center justify-center">
          {cards.map((card) => (
            <CardContainer className="inter-var" key={card.name}>
              <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[20rem] h-auto rounded-xl p-6 border  ">
                <CardItem className="text-xl font-bold text-white">
                  {card.name}
                </CardItem>
                <CardItem className="text-2xl md:text-6xl font-bold text-white">
                  {card.price}
                </CardItem>
                <CardItem
                  as="p"
                  className="text-gray-300 text-sm max-w-sm mt-2"
                >
                  {card.description}
                </CardItem>
                <div className="flex flex-col gap-y-3 pt-4">
                  {card.features.map((f) => (
                    <CardItem key={f} className="flex items-center gap-x-4">
                      <Check color="white" />
                      <CardItem className="text-sm text-gray-300">{f}</CardItem>
                    </CardItem>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    as="button"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    Try now →
                  </CardItem>
                  <CardItem
                    as="button"
                    className="px-4 py-2 rounded-xl  bg-white text-black  text-xs font-bold"
                  >
                    Get Started Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>
    </main>
  );
}
