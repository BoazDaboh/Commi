"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { findLocation } from "@/lib/locations";
import styles from "@/app/page.module.css";

const suggestions = ["Lagos"];

export default function CitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const city = query.trim();
    if (!city) {
      setResult("Enter a city name to begin.");
      return;
    }
    const location = findLocation(city);
    if (!location) {
      setResult("Only Lagos is available for now.");
      return;
    }
    router.push(`/map/${location.slug}`);
  }

  return (
    <div className={styles.citySearch}>
      <form
        onSubmit={search}
        className={styles.searchForm}
        role="search"
        aria-label="Find a city"
      >
        <label htmlFor="city-search" className={styles.srOnly}>
          City name
        </label>
        <span className={styles.searchIcon} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </span>
        <input
          id="city-search"
          type="search"
          placeholder="Search a city"
          value={query}
          maxLength={80}
          onChange={(event) => {
            setQuery(event.target.value);
            setResult("");
          }}
          aria-describedby="city-search-status"
          autoComplete="off"
          required
        />
        <button type="submit">
          Find a city <span aria-hidden="true">↗</span>
        </button>
      </form>
      <div className={styles.suggestions}>
        {suggestions.map((city) => (
          <button
            type="button"
            key={city}
            onClick={() => {
              setQuery(city);
              setResult("");
              document.getElementById("city-search")?.focus();
            }}
          >
            {city}
          </button>
        ))}
      </div>
      <p id="city-search-status" className={styles.searchResult} role="status">
        {result}
      </p>
    </div>
  );
}
