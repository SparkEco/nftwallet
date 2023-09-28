import geodata from "@/components/geolocation.json";

export async function generateStaticParams({
  params: { id },
}: {
  params: { id: number };
}) {
  const nftdata = geodata.features[0];

  return {
    nft: nftdata,
  };
}

function Details({ params }: { params: { properties: any } }) {
  console.log(geodata);
  return (
    <div className={`bg-black h-[40vh]`}>
      <h1>999 shit</h1>
    </div>
  );
}

export default Details;
