import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contador from "@/components/Contador";
import FormEscuta from "@/components/FormEscuta";
import Devolutivas from "@/components/Devolutivas";
import RedesSociais from "@/components/RedesSociais";
import MapaPreview from "@/components/MapaPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Devolutivas />

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
