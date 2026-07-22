import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { MenuExplorer } from "@/components/MenuExplorer";
import { Payments } from "@/components/Payments";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/config/site";
import { pizzas } from "@/data/menu";

/** Datos estructurados para que Google muestre el menú en los resultados. */
function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${site.name} ${site.city}`,
    description: site.description,
    servesCuisine: "Pizza",
    telephone: `+${site.whatsapp}`,
    url: site.url,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Valle del Cauca",
      addressCountry: "CO",
    },
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Pizzas",
        hasMenuItem: pizzas.map((pizza) => ({
          "@type": "MenuItem",
          name: pizza.name,
          description: pizza.description,
          offers: { "@type": "Offer", price: pizza.price, priceCurrency: "COP" },
        })),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <MenuExplorer />
        <Payments />
        <Hours />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
