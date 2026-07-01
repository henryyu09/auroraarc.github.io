import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import SelectedWriting from "@/components/home/SelectedWriting";
import StackInterests from "@/components/home/StackInterests";

export const metadata: Metadata = {
  title: "Henry Yu — ML, Systems & Visualization",
  description:
    "Portfolio of Henry Yu — CS student building ML, systems, and visualization projects with an emphasis on readable engineering.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      {/* <SelectedWriting /> */}
      <StackInterests />
    </>
  );
}
