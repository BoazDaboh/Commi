import boundary from "@/data/boundaries/lagos.json";
import lagos from "@/data/lagos-places.json";

export type HeatPoint = [number, number, number];

const ring = boundary.geometry.coordinates[0] as number[][];

function insideState(latitude: number, longitude: number) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (
      yi > latitude !== yj > latitude &&
      longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

const hotspotNames = new Set([
  "Ikeja",
  "Agege",
  "Ojodu",
  "Maryland",
  "Yaba",
  "Surulere",
  "Victoria Island",
  "Lekki Phase I",
  "Ajah",
  "Ikorodu",
  "Badagry",
  "Epe",
  "Ikotun",
  "Festac Town",
  "Ojo",
  "Abule Egba",
]);
const hotspots = lagos.places.filter(({ name }) => hotspotNames.has(name));

function preferenceSeed(id: string) {
  return (
    [...id].reduce(
      (seed, letter) => (seed * 31 + letter.charCodeAt(0)) >>> 0,
      0,
    ) % 1000
  );
}

export function demoHeatPoints(selected: string[]): HeatPoint[] {
  const ids = selected.length ? selected : ["demo"];
  return hotspots.flatMap(({ name, center }) => {
    const strength =
      0.45 +
      (0.55 *
        ids.reduce(
          (sum, id) => sum + preferenceSeed(`${id}:${name}`) / 1000,
          0,
        )) /
        ids.length;
    const offsets = [
      [0, 0, 1.25],
      [0.0015, 0.0025, 0.4],
      [-0.003, -0.001, 0.3],
      [0.0025, -0.002, 0.2],
    ];
    return offsets.flatMap(
      ([latitudeOffset, longitudeOffset, weight]): HeatPoint[] => {
        const latitude = center[0] + latitudeOffset;
        const longitude = center[1] + longitudeOffset;
        return insideState(latitude, longitude)
          ? [[latitude, longitude, strength * weight]]
          : [];
      },
    );
  });
}

export const demoBoundaryRing = ring;
