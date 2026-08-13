import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import NaverBlog from "./components/NaverBlog";
import ContactForm from "./components/ContactForm";
import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { getPortfolioItems } from "@/lib/portfolio";
import { getSettings } from "@/lib/settings";
import { serviceCategories } from "@/lib/service-categories";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export default async function Home() {
  const [portfolioItems, settings] = await Promise.all([
    getPortfolioItems(),
    getSettings(),
  ]);

  // 서비스 카테고리별 대표 포트폴리오 이미지를 붙여 ItemList 카드 데이터 구성
  const serviceItems = serviceCategories.map((sc) => {
    const firstItem = portfolioItems.find(
      (item) => item.category === sc.category,
    );
    return {
      url: `${SITE_URL}/services/${sc.slug}`,
      name: `${sc.subtitle} 풍선 장식`,
      description: sc.description,
      image: firstItem?.imageUrl,
    };
  });

  return (
    <>
      <JsonLd
        phone={settings.phone}
        instagram={settings.instagram}
        naverBlog={settings.naverBlog}
        services={serviceItems}
      />
      <Header />
      <Hero />
      <main>
        <Services />
        <Process />
        <Gallery items={portfolioItems} />
        <NaverBlog blogUrl={settings.naverBlog} />
        <ContactForm settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingContact phone={settings.phone} kakaoChannel={settings.kakaoChannel} />
    </>
  );
}
