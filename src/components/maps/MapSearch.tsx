"use client";

import { useState, type FormEvent } from "react";
import type { MapLocation, MapView } from "@/lib/locations";
import { findMapView, placeSuggestions } from "@/lib/place-search";
import styles from "@/app/map/[location]/map.module.css";

export default function MapSearch({
  location,
  onSelect,
}: {
  location: MapLocation;
  onSelect: (view: MapView) => void;
}) {
  const [query, setQuery] = useState(location.name);
  const [error, setError] = useState("");

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const view = findMapView(query, location);
    if (!view) {
      setError(`No matching place in ${location.name}.`);
      return;
    }
    setError("");
    onSelect(view);
  }

  return (
    <div className={styles.search}>
      <form onSubmit={search} role="search" aria-label="Find a place">
        <label htmlFor="map-search" className={styles.srOnly}>
          State or place
        </label>
        <input
          id="map-search"
          type="search"
          value={query}
          placeholder="Search within Lagos"
          list="map-places"
          required
          maxLength={80}
          aria-describedby="map-search-status"
          onChange={(event) => {
            setQuery(event.target.value);
            setError("");
          }}
        />
        <datalist id="map-places">
          {[location.name, ...placeSuggestions(query)].map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <button type="submit" aria-label="Search map">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </form>
      <p id="map-search-status" className={styles.searchError} role="status">
        {error}
      </p>
    </div>
  );
}
