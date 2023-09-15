"use client";

import StickyFooter from "@/components/StickyFooter";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const ACCESS_TOKEN =
  "pk.eyJ1IjoibWljaGFlbGNocmlzdHdpbiIsImEiOiJjbG1odXpzYjIwMTUwM2RrMHoza2R4cnIwIn0.wgeAoyvnaxTExAedlr683Q";
mapboxgl.accessToken = ACCESS_TOKEN;
function Main() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(8.6753);
  const [lat, setLat] = useState(9.082);
  const [zoom, setZoom] = useState(3.5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name: "mercator",
      },
    });
  });

  return (
    <div className={`text-center`}>
      <div ref={mapContainer} className="map-container h-[600px]" />

      {/* <StickyFooter /> */}
    </div>
  );
}

export default Main;
