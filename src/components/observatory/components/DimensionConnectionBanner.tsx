
import React from "react";
import { Database, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DimensionConnectionBannerProps {
  activeSection: string;
  onNavigate: (route: string) => void;
}

export const DimensionConnectionBanner = ({ 
  activeSection, 
  onNavigate 
}: DimensionConnectionBannerProps) => {
  if (activeSection !== "framework" && activeSection !== "ecosystem") {
    return null;
  }

  return (
    <Card className="mb-6 bg-skyvidya-lightGray/50 border-skyvidya-mediumGray/30">
      <CardContent className="py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-skyvidya-deepBlue" />
            <div>
              <h3 className="text-sm font-medium">
                SKYVIDYA Framework Integration
              </h3>
              <p className="text-xs text-muted-foreground">
                The Framework dimensions form the structure for
                ecosystem case studies
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-white">
              {activeSection === "framework"
                ? "Viewing Framework"
                : "Viewing Ecosystem"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() =>
                onNavigate(
                  activeSection === "framework"
                    ? "ecosystem"
                    : "framework",
                )
              }
            >
              {activeSection === "framework"
                ? "Go to Ecosystem"
                : "Go to Framework"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
