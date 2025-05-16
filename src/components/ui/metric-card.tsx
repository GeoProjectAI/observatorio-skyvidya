import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "./progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "coral" | "neutral";
  progress?: number;
  subtitle?: string;
  className?: string;
  additionalInfo?: {
    label: string;
    value: string | number;
  }[];
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  color = "blue",
  progress,
  subtitle,
  className,
  additionalInfo,
}: MetricCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-skyvidya-deepBlue",
          text: "text-skyvidya-deepBlue",
          lightBg: "bg-skyvidya-deepBlue/10",
          progressBg: "bg-skyvidya-deepBlue/20",
          progressFill: "bg-skyvidya-deepBlue",
        };
      case "green":
        return {
          bg: "bg-skyvidya-vibrantGreen",
          text: "text-skyvidya-vibrantGreen",
          lightBg: "bg-skyvidya-vibrantGreen/10",
          progressBg: "bg-skyvidya-vibrantGreen/20",
          progressFill: "bg-skyvidya-vibrantGreen",
        };
      case "coral":
        return {
          bg: "bg-skyvidya-coral",
          text: "text-skyvidya-coral",
          lightBg: "bg-skyvidya-coral/10",
          progressBg: "bg-skyvidya-coral/20",
          progressFill: "bg-skyvidya-coral",
        };
      default:
        return {
          bg: "bg-skyvidya-darkGray",
          text: "text-skyvidya-darkGray",
          lightBg: "bg-skyvidya-lightGray",
          progressBg: "bg-skyvidya-lightGray",
          progressFill: "bg-skyvidya-darkGray",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      <div className={cn(colors.lightBg, "p-4 h-full")}>
        <div className="flex items-center gap-2 mb-2">
          {icon && <div className={cn(colors.text)}>{icon}</div>}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <div className={cn("text-4xl font-bold", colors.text)}>{value}</div>
          {unit && <div className="text-lg">{unit}</div>}
        </div>
        {subtitle && (
          <div className="text-xs text-skyvidya-darkGray mt-1">{subtitle}</div>
        )}

        {progress !== undefined && (
          <div className="mt-2">
            <Progress
              value={progress}
              className={cn("h-1", colors.progressBg)}
              indicatorClassName={colors.progressFill}
            />
          </div>
        )}

        {additionalInfo && additionalInfo.length > 0 && (
          <div className="mt-3 space-y-1">
            {additionalInfo.map((info, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-skyvidya-darkGray">{info.label}</span>
                <span className="font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
