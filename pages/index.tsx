// pages/index.js
import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Benefits from "@/components/Benefits";
import AppReview from "@/components/AppReview";
import Features from "@/components/Features";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Layout title="ClearCutToday – Emotional Clarity System">
        <NavBar />
        <HeroSection />
        <Benefits />
        <AppReview />
        <Features />
        <Cta />
        <Footer />
      </Layout>
    </>
  );
}
