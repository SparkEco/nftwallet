import { getGeojson, getAll } from "@/actions/actions";
import { useDispatch } from "react-redux";
import { getData } from "@/redux/slices/nfts.slice";
import { setGeoJson } from "@/redux/slices/geojson.slice";
import Explorer from "@/components/Explorer";

async function Main() {
  let allNFTData = await getAll();
  let geo = await getGeojson(allNFTData);

  return <Explorer allData={allNFTData} geojson={geo} />;
}

export default Main;
