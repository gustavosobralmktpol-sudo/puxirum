import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Contador from "@/components/Contador";
import FormEscuta from "@/components/FormEscuta";
import RedesSociais from "@/components/RedesSociais";
import MapaPreview from "@/components/MapaPreview";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />

        <div className="section-container">
          <Contador />
        </div>

        <FormEscuta />
        <RedesSociais />
        <MapaPreview />
      </main>
      <Footer />
    </>
  );
}
