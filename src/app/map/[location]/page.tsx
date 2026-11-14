import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MapExperience from "@/components/maps/MapExperience";
import { locations } from "@/lib/locations";

type Props = { params: Promise<{ location: string }> };

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ location: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  const location = locations.find((entry) => entry.slug === slug);
  return {
    title: `${location?.name ?? "Map"} | Commi`,
    description: "Explore Lagos State on an interactive OpenStreetMap map.",
  };
}

export default async function MapPage({ params }: Props) {
  const { location: slug } = await params;
  const location = locations.find((entry) => entry.slug === slug);
  if (!location) notFound();

  return <MapExperience key={location.slug} location={location} />;
}
