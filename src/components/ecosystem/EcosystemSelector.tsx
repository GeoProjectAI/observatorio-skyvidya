import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, TreePine, Tractor, Sprout, ArrowRight } from "lucide-react";
import { SkyvidyaButton } from "@/components/ui/skyvidya-button";

interface EcosystemSelectorProps {
  onSelect: (ecosystemId: string) => void;
  activeEcosystem?: string;
}

export function EcosystemSelector({
  onSelect,
  activeEcosystem,
}: EcosystemSelectorProps) {
  const ecosystems = [
    {
      id: "climate",
      title: "Climate Intelligence",
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      description:
        "Monitor climate patterns, anomalies, and resilience metrics",
      color: "bg-blue-50 border-blue-200",
      activeColor: "bg-blue-100 border-blue-300",
      textColor: "text-blue-700",
    },
    {
      id: "forest",
      title: "Forest Intelligence",
      icon: <TreePine className="h-5 w-5 text-green-600" />,
      description:
        "Track forest cover, deforestation, and biodiversity metrics",
      color: "bg-green-50 border-green-200",
      activeColor: "bg-green-100 border-green-300",
      textColor: "text-green-700",
    },
    {
      id: "rural",
      title: "Rural Intelligence",
      icon: <Tractor className="h-5 w-5 text-amber-600" />,
      description:
        "Analyze agricultural practices, soil health, and rural development",
      color: "bg-amber-50 border-amber-200",
      activeColor: "bg-amber-100 border-amber-300",
      textColor: "text-amber-700",
    },
    {
      id: "greendeal",
      title: "Green Deal EGS",
      icon: <Sprout className="h-5 w-5 text-emerald-600" />,
      description:
        "Track environmental goods & services and green transition metrics",
      color: "bg-emerald-50 border-emerald-200",
      activeColor: "bg-emerald-100 border-emerald-300",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ecosystem Intelligence</h3>
      <div className="grid grid-cols-1 gap-3">
        {ecosystems.map((ecosystem) => {
          const isActive = activeEcosystem === ecosystem.id;
          return (
            <Card
              key={ecosystem.id}
              className={`cursor-pointer border transition-all ${isActive ? ecosystem.activeColor : ecosystem.color} hover:shadow-md`}
              onClick={() => onSelect(ecosystem.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white">
                      {ecosystem.icon}
                    </div>
                    <div>
                      <h4 className={`font-medium ${ecosystem.textColor}`}>
                        {ecosystem.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                        {ecosystem.description}
                      </p>
                    </div>
                  </div>
                  {isActive ? (
                    <Badge className={ecosystem.textColor}>Active</Badge>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <SkyvidyaButton
        variant="outline"
        className="w-full justify-center mt-2 text-sm"
      >
        View All Ecosystems
      </SkyvidyaButton>
    </div>
  );
}
