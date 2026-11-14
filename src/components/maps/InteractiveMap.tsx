"use client";

import { useEffect, useState } from "react";
import { latLngBounds } from "leaflet";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import StateBoundary from "./StateBoundary";
import MapPreloader from "./MapPreloader";
import DemoHeatmap from "./DemoHeatmap";
import { mapTiles, type MapLocation, type MapView } from "@/lib/locations";
import "leaflet/dist/leaflet.css";
import styles from "@/app/map/[location]/map.module.css";

function MapFocus({ view }: { view: MapView }) {
  const map = useMap();
  useEffect(() => {
    map.setView(view.center, view.zoom, { animate: false });
  }, [map, view]);
  return null;
}

function ResetView({ view }: { view: MapView }) {
  const map = useMap();
  return (
    <button
      className={styles.reset}
      type="button"
      onClick={() => map.setView(view.center, view.zoom, { animate: false })}
      aria-label="Reset map view"
      title="Reset view"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      </svg>
    </button>
  );
}

export default function InteractiveMap({
  location,
  view,
  selected,
}: {
  location: MapLocation;
  view: MapView;
  selected: string[];
}) {
  const [tileError, setTileError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  return (
    <>
      <MapContainer
        className={styles.map}
        center={view.center}
        zoom={view.zoom}
        maxBounds={latLngBounds(location.bounds).pad(0.25)}
        maxBoundsViscosity={1}
        minZoom={5}
        maxZoom={19}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl
      >
        <TileLayer
          key={attempt}
          url={mapTiles.url}
          attribution={mapTiles.attribution}
          bounds={location.bounds}
          noWrap
          updateWhenIdle
          updateWhenZooming={false}
          keepBuffer={1}
          maxNativeZoom={16}
          maxZoom={19}
          eventHandlers={{
            load: () => setLoading(false),
            tileerror: () => {
              setTileError(true);
              setLoading(false);
            },
          }}
        />
        <MapFocus view={view} />
        <DemoHeatmap selected={selected} />
        <StateBoundary slug={location.slug} />
        <ZoomControl position="bottomright" />
        <ResetView view={view} />
      </MapContainer>
      {loading && !tileError && <MapPreloader />}
      {tileError && (
        <div className={styles.tileStatus} role="status">
          Map tiles couldn’t load.
          <button
            type="button"
            onClick={() => {
              setTileError(false);
              setLoading(true);
              setAttempt((value) => value + 1);
            }}
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
}
