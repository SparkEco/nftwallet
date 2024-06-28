import { getAllCollections } from "@/actions/collections";
import CollectionCard from "@/components/ColectionCard";
import { Address } from "viem";

async function Page() {
  const collections = await getAllCollections();
  console.log(collections);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 w-full h-[100vh] p-[20px]">
      {collections &&
        collections.map((item, index) => (
          <CollectionCard key={index} address={item as Address} />
        ))}
    </div>
  );
}

export default Page;
