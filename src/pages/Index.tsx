import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Marketplace from "@/components/Marketplace";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-clash">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Marketplace />
      </main>
    </div>
  );
};

export default Index;
