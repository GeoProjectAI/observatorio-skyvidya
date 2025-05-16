import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./card";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/colors";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    direction: "up" | "down" | "stable";
    value: string | number;
    label?: string;
  };
  footer?: React.ReactNode;
  variant?: "default" | "ocean" | "earth" | "climate" | "neutral";
  size?: "sm" | "md" | "lg";
}

export function DataCard({
  title,
  value,
  description,
  icon,
  trend,
  footer,
  variant = "default",
  size = "md",
  className,
  ...props
}: DataCardProps) {
  // Determine background color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case "ocean":
        return "bg-skyvidya-deepBlue/10";
      case "earth":
        return "bg-skyvidya-vibrantGreen/10";
      case "climate":
        return "bg-skyvidya-coral/10";
      case "neutral":
        return "bg-skyvidya-lightGray/50";
      default:
        return "bg-white";
    }
  };

  // Determine icon background color
  const getIconBgColor = () => {
    switch (variant) {
      case "ocean":
        return "bg-skyvidya-deepBlue/20";
      case "earth":
        return "bg-skyvidya-vibrantGreen/20";
      case "climate":
        return "bg-skyvidya-coral/20";
      case "neutral":
        return "bg-skyvidya-lightGray";
      default:
        return "bg-primary/10";
    }
  };

  // Determine icon color
  const getIconColor = () => {
    switch (variant) {
      case "ocean":
        return "text-skyvidya-deepBlue";
      case "earth":
        return "text-skyvidya-vibrantGreen";
      case "climate":
        return "text-skyvidya-coral";
      case "neutral":
        return "text-skyvidya-darkGray";
      default:
        return "text-primary";
    }
  };

  // Determine trend color
  const getTrendColor = () => {
    if (!trend) return "";

    if (trend.direction === "up") return "text-skyvidya-vibrantGreen";
    if (trend.direction === "down") return "text-skyvidya-coral";
    return "text-skyvidya-darkGray";
  };

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          card: "p-3",
          title: "text-sm",
          value: "text-xl",
          description: "text-xs",
        };
      case "lg":
        return {
          card: "p-6",
          title: "text-lg",
          value: "text-4xl",
          description: "text-sm",
        };
      default: // md
        return {
          card: "p-4",
          title: "text-base",
          value: "text-2xl",
          description: "text-xs",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <Card
      className={cn(
        getBackgroundColor(),
        "border-none hover:shadow-md transition-all duration-300",
        className,
      )}
      {...props}
    >
      <CardHeader className={cn("pb-2", sizeClasses.card)}>
        <div className="flex justify-between items-start">
          {icon && (
            <div className={cn("p-2 rounded-full", getIconBgColor())}>
              <div className={getIconColor()}>{icon}</div>
            </div>
          )}
          <CardTitle className={cn("mt-2", sizeClasses.title)}>
            {title}
          </CardTitle>
        </div>
        {description && (
          <CardDescription className={sizeClasses.description}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn("font-bold", sizeClasses.value)}>{value}</div>
        {trend && (
          <div className="flex items-center space-x-1 mt-2">
            <span className={cn("text-sm font-medium", getTrendColor())}>
              {trend.direction === "up" && "+"}
              {trend.value} {trend.label}
            </span>
          </div>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
