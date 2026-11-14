"use client";

import dynamic from "next/dynamic";
import type { MapLocation, MapView } from "@/lib/locations";
import MapPreloader from "./MapPreloader";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => <MapPreloader />,
});

export default function MapExplorer({
  location,
  view,
  selected,
}: {
  location: MapLocation;
  view: MapView;
  selected: string[];
}) {
  return (
    <InteractiveMap
      key={location.slug}
      location={location}
      view={view}
      selected={selected}
    />
  );
}
