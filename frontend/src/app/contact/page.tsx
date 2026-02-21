// src/app/contact/page.tsx
import { Metadata } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";

// Section Components
import HeroBanner from "./components/HeroBanner";
import ContactForm from "./components/ContactForm";
import VisitUsSection from "./components/VisitUsSection";
import SocialConnect from "./components/SocialConnect";
import FAQ from "./components/FAQ";

export const metadata: Metadata = {
  title: "Contact Us - Kochi Guru Pizza",
  description:
    "Get in touch with Kochi Guru Pizza. Find us at the Cargills Food City Building in Walasmulla, call us on 077 077 6848, or send us a message online.",
  openGraph: {
    title: "Contact Us - Kochi Guru Pizza",
    description:
      "Reach out to Kochi Guru Pizza — we are open every day 10 AM to 10 PM at Walasmulla."
  }
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <ContactForm />
      <VisitUsSection />
      <SocialConnect />
      <FAQ />
      <Footer />
    </>
  );
}
