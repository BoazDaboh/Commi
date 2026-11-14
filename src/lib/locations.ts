export type MapView = {
  name: string;
  center: [number, number];
  zoom: number;
};

export type MapLocation = {
  slug: string;
  name: string;
  aliases: string[];
  bounds: [[number, number], [number, number]];
  capital: MapView;
};

export const locations: MapLocation[] = [
  {
    slug: "lagos",
    name: "Lagos State",
    aliases: ["lagos", "lagos state", "lagos nigeria", "lagos state nigeria"],
    capital: { name: "Ikeja", center: [6.601627, 3.3515981], zoom: 12 },
    bounds: [
      [6.366684, 2.7059846],
      [6.6967964, 4.3509056],
    ],
  },
];

export function findLocation(query: string) {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
  return locations.find((location) => location.aliases.includes(normalized));
}

export const mapTiles = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
