import React from "react";
import { cn } from "@/lib/utils";

type StatusType =
  | "low"
  | "medium"
  | "high"
  | "good"
  | "warning"
  | "critical"
  | "info";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({
  status,
  label,
  className,
  size = "md",
}: StatusBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case "low":
        return "bg-skyvidya-vibrantGreen/20 text-skyvidya-vibrantGreen border-skyvidya-vibrantGreen/30";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "high":
        return "bg-skyvidya-coral/20 text-skyvidya-coral border-skyvidya-coral/30";
      case "good":
        return "bg-skyvidya-vibrantGreen/20 text-skyvidya-vibrantGreen border-skyvidya-vibrantGreen/30";
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "critical":
        return "bg-skyvidya-coral/20 text-skyvidya-coral border-skyvidya-coral/30";
      case "info":
        return "bg-skyvidya-deepBlue/20 text-skyvidya-deepBlue border-skyvidya-deepBlue/30";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-sm px-3 py-1.5";
      default: // md
        return "text-xs px-2.5 py-1";
    }
  };

  const displayLabel =
    label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-medium",
        getStatusClasses(),
        getSizeClasses(),
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}
