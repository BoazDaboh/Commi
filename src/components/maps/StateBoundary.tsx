"use client";

import type { Feature, MultiPolygon, Polygon as GeoJSONPolygon } from "geojson";
import type { LatLngTuple } from "leaflet";
import { GeoJSON, Polygon } from "react-leaflet";
import lagos from "@/data/boundaries/lagos.json";
import styles from "@/app/map/[location]/map.module.css";

const boundaries: Record<string, Feature<GeoJSONPolygon | MultiPolygon>> = {
  lagos: lagos as Feature<GeoJSONPolygon | MultiPolygon>,
};

const world: LatLngTuple[] = [
  [-85, -180],
  [85, -180],
  [85, 180],
  [-85, 180],
];

export default function StateBoundary({ slug }: { slug: string }) {
  const boundary = boundaries[slug];
  if (!boundary) return null;

  const polygons =
    boundary.geometry.type === "Polygon"
      ? [boundary.geometry.coordinates]
      : boundary.geometry.coordinates;
  const rings = polygons.flatMap((polygon) =>
    polygon.map((ring) =>
      ring.map(([longitude, latitude]): LatLngTuple => [latitude, longitude]),
    ),
  );

  return (
    <>
      <Polygon
        positions={[world, ...rings]}
        bubblingMouseEvents={false}
        pathOptions={{
          stroke: false,
          fillColor: "#eeefed",
          fillOpacity: 0.82,
          fillRule: "evenodd",
          className: styles.inactiveArea,
        }}
      />
      <GeoJSON
        key={slug}
        data={boundary}
        interactive={false}
        style={{ color: "var(--accent)", weight: 3, opacity: 1, fill: false }}
      />
    </>
  );
}
