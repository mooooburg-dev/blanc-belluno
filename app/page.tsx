import { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import InstagramFeed from "./components/InstagramFeed";
import InstagramFeedSkeleton from "./components/InstagramFeedSkeleton";
import ContactForm from "./components/ContactForm";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";

export const revalidate = 300;

export default async function Home() {
  const [portfolioItems, settings] = await Promise.all([
    getPortfolioItems(),
    getSettings(),
  ]);

  return (
    <>
      <JsonLd
        phone={settings.phone}
        instagram={settings.instagram}
        naverBlog={settings.naverBlog}
      />
      <Header />
      <Hero />
      <main>
        <Services />
        <Process />
        <Gallery items={portfolioItems} />
        <Suspense fallback={<InstagramFeedSkeleton handle={settings.instagram} />}>
          <InstagramFeed settings={settings} />
        </Suspense>
        <ContactForm settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingContact phone={settings.phone} kakaoChannel={settings.kakaoChannel} />
    </>
  );
}
