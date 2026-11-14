import { preferences } from "./preferences";

const changedEvent = "commi-preferences-changed";

export function subscribePreferences(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changedEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(changedEvent, listener);
  };
}

export function readPreferences(slug: string) {
  try {
    return window.localStorage.getItem(`commi:preferences:${slug}`);
  } catch {
    return null;
  }
}

export function serverPreferences(): undefined {
  return undefined;
}

export function parsePreferences(
  raw: string | null | undefined,
): string[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (
      typeof data !== "object" ||
      data === null ||
      !("version" in data) ||
      data.version !== 1 ||
      !("selected" in data) ||
      !Array.isArray(data.selected) ||
      !data.selected.every((id: unknown) => typeof id === "string")
    )
      return null;
    const known = new Set(preferences.map(({ id }) => id));
    return [...new Set<string>(data.selected)].filter((id) => known.has(id));
  } catch {
    return null;
  }
}

export function savePreferences(slug: string, selected: string[]) {
  try {
    window.localStorage.setItem(
      `commi:preferences:${slug}`,
      JSON.stringify({ version: 1, selected }),
    );
    window.dispatchEvent(new Event(changedEvent));
  } catch {
    return;
  }
}
