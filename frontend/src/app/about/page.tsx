import { Metadata } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";

// Section Components
import HeroBanner from "./components/HeroBanner";
import StorySection from "./components/StorySection";
import MenuHighlights from "./components/MenuHighlights";
import VisitUsSection from "./components/VisitUsSection";
import CtaBanner from "./components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us - Kochi Guru Pizza",
  description:
    "Bringing authentic Italian flavors to the heart of Walasmulla. Learn more about Kochi Guru Pizza, our story, and our passion for wood-fired pizzas.",
  openGraph: {
    title: "About Us - Kochi Guru Pizza",
    description:
      "Bringing authentic Italian flavors to the heart of Walasmulla. Learn more about Kochi Guru Pizza."
  }
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <StorySection />
      <MenuHighlights />
      <VisitUsSection />
      <CtaBanner />
      <Footer />
    </>
  );
}
