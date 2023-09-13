"use client";

import StickyFooter from "@/components/StickyFooter";
import Head from "next/head";
import Map from "react-map-gl";

const ACCESS_TOKEN =
  "pk.eyJ1IjoibWljaGFlbGNocmlzdHdpbiIsImEiOiJjbG1odXpzYjIwMTUwM2RrMHoza2R4cnIwIn0.wgeAoyvnaxTExAedlr683Q";

function Main() {
  return (
    <div className={`text-center`}>
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100vw", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
      {/* <StickyFooter /> */}
    </div>
  );
}

export default Main;
