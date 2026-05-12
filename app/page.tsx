import Header from "./components/Header";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import InstagramFeed from "./components/InstagramFeed";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const portfolioItems = await getPortfolioItems();
  const settings = await getSettings();

  return (
    <>
      <JsonLd
        phone={settings.phone}
        instagram={settings.instagram}
        naverBlog={settings.naverBlog}
      />
      <Header />
      <main className="pt-20 md:pt-24">
        <Services />
        <Gallery items={portfolioItems} />
        <InstagramFeed settings={settings} />
        <ContactForm settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
