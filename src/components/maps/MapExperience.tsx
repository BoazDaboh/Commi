"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import MapExplorer from "./MapExplorer";
import MapSearch from "./MapSearch";
import PreferencePicker from "./PreferencePicker";
import MapPreloader from "./MapPreloader";
import type { MapLocation } from "@/lib/locations";
import { preferences } from "@/lib/preferences";
import {
  parsePreferences,
  readPreferences,
  savePreferences,
  serverPreferences,
  subscribePreferences,
} from "@/lib/preference-storage";
import styles from "@/app/map/[location]/map.module.css";

export default function MapExperience({ location }: { location: MapLocation }) {
  const stored = useSyncExternalStore(
    subscribePreferences,
    () => readPreferences(location.slug),
    serverPreferences,
  );
  const saved = useMemo(() => parsePreferences(stored), [stored]);
  const [editing, setEditing] = useState<boolean | null>(null);
  const [draft, setSelected] = useState<string[] | null>(null);
  const [view, setView] = useState(location.capital);
  const ready = stored !== undefined;
  const choosing = editing ?? saved === null;
  const selected = draft ?? saved ?? [];
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [choosing, ready]);

  function showPreferences(value: boolean) {
    if (!value) savePreferences(location.slug, selected);
    setEditing(value);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  if (!ready) return <MapPreloader fullPage />;

  return (
    <main
      ref={mainRef}
      tabIndex={-1}
      className={choosing ? styles.preferencePage : styles.page}
      aria-label={
        choosing ? `Preferences for ${location.name}` : `${location.name} map`
      }
    >
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Commi home">
          commi<span>.</span>
        </Link>
        {choosing ? (
          <span className={styles.selectedState}>{location.name}</span>
        ) : (
          <MapSearch
            location={location}
            onSelect={(target) => setView({ ...target })}
          />
        )}
        <Link href="/" className={styles.back}>
          <span aria-hidden="true">↖</span> Back
        </Link>
      </header>
      {choosing ? (
        <>
          <PreferencePicker selected={selected} onChange={setSelected} />
          <div className={styles.floatingAction}>
            <button type="button" onClick={() => showPreferences(false)}>
              Set preferences
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.mapPreferences}>
            <ul
              className={styles.selectedPreferences}
              aria-label="Selected preferences"
              tabIndex={selected.length > 0 ? 0 : undefined}
            >
              {preferences
                .filter(({ id }) => selected.includes(id))
                .map(({ id, label }) => (
                  <li key={id}>{label}</li>
                ))}
            </ul>
            <button
              type="button"
              onClick={() => showPreferences(true)}
              aria-label="Add preferences"
            >
              + add
            </button>
          </div>
          <section
            className={styles.viewport}
            aria-label={`Interactive map of ${location.name}`}
          >
            <div className={styles.locationBadge}>
              <span aria-hidden="true" />
              <h1>{view.name}</h1>
            </div>
            <MapExplorer location={location} view={view} selected={selected} />
            <div
              className={styles.heatLegend}
              aria-label="Demo heatmap using simulated preference data. Lighter means lower intensity; darker means higher intensity."
            >
              <span>
                Demo heatmap <small>Simulated</small>
              </span>
              <div className={styles.heatScale} aria-hidden="true" />
              <div className={styles.heatScaleLabels}>
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
