"use client";

import styles from "@/app/map/[location]/map.module.css";
import { preferences } from "@/lib/preferences";

type Props = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function PreferencePicker({ selected, onChange }: Props) {
  function toggle(id: string) {
    onChange(
      selected.includes(id)
        ? selected.filter((preference) => preference !== id)
        : [...selected, id],
    );
  }

  return (
    <section className={styles.preferences} aria-labelledby="preferences-title">
      <h1 id="preferences-title" className={styles.srOnly}>
        Preferences
      </h1>
      <div
        className={styles.preferenceOptions}
        role="group"
        aria-labelledby="preferences-title"
      >
        {preferences.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={styles.preference}
            aria-pressed={selected.includes(id)}
            onClick={() => toggle(id)}
          >
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
