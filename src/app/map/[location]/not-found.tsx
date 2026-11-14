import Link from "next/link";
import styles from "./map.module.css";

export default function MapNotFound() {
  return (
    <main className={styles.notFound}>
      <h1>This map isn’t available yet.</h1>
      <Link href="/map/lagos">Explore Lagos ↗</Link>
      <Link href="/">Back home</Link>
    </main>
  );
}
