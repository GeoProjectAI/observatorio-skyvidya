import React from "react";
import { cn } from "@/lib/utils";

interface SkyvidyaLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function SkyvidyaLogo({
  variant = "default",
  size = "md",
  showText = true,
  className,
}: SkyvidyaLogoProps) {
  // Size classes for the logo
  const sizeClasses = {
    sm: {
      container: "h-8",
      logo: "h-8",
      title: "text-xs",
    },
    md: {
      container: "h-12",
      logo: "h-12",
      title: "text-sm",
    },
    lg: {
      container: "h-16",
      logo: "h-16",
      title: "text-base",
    },
  };

  // Logo image paths based on variant
  const logoSrc = {
    default: "https://i.imgur.com/Yx3oUZP.png", // Dark logo
    light: "https://i.imgur.com/Yx3oUZP.png", // Dark logo
    dark: "https://i.imgur.com/Yx3oUZP.png", // Dark logo
  };

  return (
    <div
      className={cn(
        "flex items-center",
        sizeClasses[size].container,
        className,
      )}
    >
      <img
        src={logoSrc[variant]}
        alt="SKYVIDYA Logo"
        className={cn(sizeClasses[size].logo, "w-auto object-contain")}
      />
    </div>
  );
}
