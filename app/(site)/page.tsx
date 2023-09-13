import Amaze from "@/components/Amaze";
import Collections from "@/components/Collections";
import Create from "@/components/Create";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TopCollection from "@/components/TopCollection";

function Home() {
  return (
    <div className="">
      <Hero />
      <Create />
      <Collections />
      <TopCollection />
      <Amaze />
      {/* <Discover /> */}
      <Footer />
    </div>
  );
}

export default Home;
