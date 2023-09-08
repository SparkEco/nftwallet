import Amaze from "@/components/Amaze";
import Collections from "@/components/Collections";
import Create from "@/components/Create";
import Discover from "@/components/Discover";
import Hero from "@/components/Hero";
import TopCollection from "@/components/TopCollection";

function Home() {
  return (
    <div className="">
      <Hero />
      <Amaze />
      <Create />
      <TopCollection />
      <Collections />
      {/* <Discover /> */}
    </div>
  );
}

export default Home;
