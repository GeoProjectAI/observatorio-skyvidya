import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

interface MapLegendProps {
  title?: string;
  items: LegendItem[];
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const MapLegend: React.FC<MapLegendProps> = ({
  title = "Legend",
  items = [],
  position = "bottom-left",
}) => {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-20 left-4",
    "bottom-right": "bottom-20 right-4",
  };

  return (
    <Card
      className={`absolute ${positionClasses[position]} z-10 w-48 bg-white/90 backdrop-blur-sm shadow-md`}
    >
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="py-2 px-3">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex justify-between w-full">
                <span className="text-xs">{item.label}</span>
                {item.value && (
                  <span className="text-xs text-muted-foreground">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapLegend;
