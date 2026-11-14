import lagos from "@/data/lagos-places.json";
import type { MapLocation, MapView } from "./locations";
import { findLocation } from "./locations";

export function normalizePlaceName(query: string) {
  return query
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function findMapView(
  query: string,
  location: MapLocation,
): MapView | undefined {
  if (findLocation(query)?.slug === location.slug) return location.capital;
  if (location.slug !== "lagos") return undefined;
  const normalized = normalizePlaceName(query).replace(
    /\s+(?:lagos(?: state)?(?: nigeria)?|nigeria)$/,
    "",
  );
  const place = lagos.places.find((place) =>
    [place.name, ...place.aliases].some(
      (name) => normalizePlaceName(name) === normalized,
    ),
  );
  if (!place) return undefined;
  return {
    name: place.name,
    center: [place.center[0], place.center[1]],
    zoom: place.zoom,
  };
}

export function placeSuggestions(query: string) {
  const normalized = normalizePlaceName(query);
  return [
    ...new Set(
      lagos.places
        .filter(({ name, aliases }) =>
          [name, ...aliases].some((name) =>
            normalizePlaceName(name).includes(normalized),
          ),
        )
        .map(({ name }) => name),
    ),
  ].slice(0, 8);
}
