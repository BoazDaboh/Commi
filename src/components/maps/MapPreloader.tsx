import styles from "@/app/map/[location]/map.module.css";

export default function MapPreloader({
  fullPage = false,
}: {
  fullPage?: boolean;
}) {
  return (
    <div
      className={fullPage ? styles.restoreLoading : styles.mapPreloader}
      role="status"
      aria-label="Loading map"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.srOnly}>Loading map…</span>
    </div>
  );
}
