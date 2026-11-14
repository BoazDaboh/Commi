"use client";

import { useEffect, useMemo } from "react";
import { HeatLayer } from "leaflet.heat";
import type { Layer } from "leaflet";
import { useMap } from "react-leaflet";
import { demoBoundaryRing, demoHeatPoints } from "@/lib/demo-heatmap";

export default function DemoHeatmap({ selected }: { selected: string[] }) {
  const map = useMap();
  const points = useMemo(() => demoHeatPoints(selected), [selected]);

  useEffect(() => {
    const pane = map.getPane("demoHeatmap") ?? map.createPane("demoHeatmap");
    pane.style.zIndex = "350";
    pane.style.pointerEvents = "none";
    pane.style.opacity = "0.8";
    const heat = new HeatLayer(points, {
      pane: "demoHeatmap",
      radius: 28,
      blur: 32,
      minOpacity: 0.01,
      max: 1.1,
      maxZoom: 12,
      gradient: {
        0.05: "#ffe1d0",
        0.35: "#ffb78b",
        0.6: "#ff804b",
        0.8: "#f25325",
        1: "#d83b18",
      },
    });
    // The plugin supports Leaflet 1.9, but its published base types target 2.0.
    const layer = heat as unknown as Layer;
    layer.addTo(map);

    function update() {
      const scale = 2 ** (map.getZoom() - 12);
      heat.setOptions({
        radius: Math.min(200, Math.max(18, 28 * scale)),
        blur: Math.min(220, Math.max(20, 32 * scale)),
      });
      const canvas = pane.querySelector("canvas");
      if (canvas) {
        canvas.style.clipPath = `polygon(${demoBoundaryRing
          .map(([longitude, latitude]) => {
            const point = map.latLngToContainerPoint([latitude, longitude]);
            return `${point.x}px ${point.y}px`;
          })
          .join(",")})`;
      }
    }
    update();
    map.on("moveend zoomend resize", update);
    return () => {
      map.off("moveend zoomend resize", update);
      layer.remove();
    };
  }, [map, points]);

  return null;
}
