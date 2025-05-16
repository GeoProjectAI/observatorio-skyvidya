import React, { useState } from "react";
import { Layer, Source } from "react-map-gl";
import * as h3 from "h3-js";

interface H3HexagonLayerProps {
  hexIds: string[];
  colorScale: (value: number) => string;
  values: Record<string, number>;
  onClick?: (hexId: string) => void;
  selectedHexId?: string;
  opacity?: number;
  layerId?: string;
}

export const H3HexagonLayer = ({
  hexIds,
  colorScale,
  values,
  onClick,
  selectedHexId,
  opacity = 0.6,
  layerId = "h3-hexagons",
}: H3HexagonLayerProps) => {
  // Convert H3 indexes to GeoJSON
  const geojson = {
    type: "FeatureCollection",
    features: hexIds.map((hexId) => ({
      type: "Feature",
      properties: {
        hexId,
        value: values[hexId] || 0,
        isSelected: hexId === selectedHexId,
      },
      geometry: {
        type: "Polygon",
        coordinates: [h3.cellToBoundary(hexId, true)],
      },
    })),
  };

  return (
    <Source id={`${layerId}-source`} type="geojson" data={geojson as any}>
      <Layer
        id={layerId}
        type="fill"
        paint={{
          "fill-color": [
            "case",
            ["boolean", ["get", "isSelected"], false],
            "#ffffff",
            [
              "interpolate",
              ["linear"],
              ["get", "value"],
              0,
              "#f7fbff",
              100,
              "#08519c",
            ],
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["get", "isSelected"], false],
            0.8,
            opacity,
          ],
          "fill-outline-color": [
            "case",
            ["boolean", ["get", "isSelected"], false],
            "#000000",
            "rgba(0,0,0,0.1)",
          ],
        }}
      />
      <Layer
        id={`${layerId}-outline`}
        type="line"
        paint={{
          "line-color": [
            "case",
            ["boolean", ["get", "isSelected"], false],
            "#000000",
            "rgba(0,0,0,0.1)",
          ],
          "line-width": [
            "case",
            ["boolean", ["get", "isSelected"], false],
            2,
            0.5,
          ],
        }}
      />
    </Source>
  );
};
