import React from "react";
import { colors } from "@/lib/colors";

/**
 * Skyvidya Theme Provider
 * This component provides consistent styling for Skyvidya components
 */

export interface SkyvidyaThemeProps {
  children: React.ReactNode;
  variant?: "default" | "ocean" | "earth" | "climate";
}

export function SkyvidyaTheme({
  children,
  variant = "default",
}: SkyvidyaThemeProps) {
  // Define CSS variables based on the variant
  const getThemeStyles = () => {
    switch (variant) {
      case "ocean":
        return {
          "--skyvidya-primary": colors.primary.deepBlue,
          "--skyvidya-secondary": colors.primary.seaBlue,
          "--skyvidya-accent": colors.primary.skyBlue,
          "--skyvidya-gradient": colors.gradients.oceanToSky,
        };
      case "earth":
        return {
          "--skyvidya-primary": colors.primary.vibrantGreen,
          "--skyvidya-secondary": colors.primary.freshGreen,
          "--skyvidya-accent": colors.primary.skyBlue,
          "--skyvidya-gradient": colors.gradients.earthTone,
        };
      case "climate":
        return {
          "--skyvidya-primary": colors.secondary.coral,
          "--skyvidya-secondary": colors.secondary.peach,
          "--skyvidya-accent": colors.primary.skyBlue,
          "--skyvidya-gradient": colors.gradients.warmClimate,
        };
      default:
        return {
          "--skyvidya-primary": colors.primary.deepBlue,
          "--skyvidya-secondary": colors.primary.skyBlue,
          "--skyvidya-accent": colors.primary.vibrantGreen,
          "--skyvidya-gradient": colors.gradients.fullSpectrum,
        };
    }
  };

  return (
    <div
      style={getThemeStyles() as React.CSSProperties}
      className="skyvidya-theme"
    >
      {children}
    </div>
  );
}

// Export themed components
export function SkyvidyaGradientText({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "ocean" | "earth" | "climate";
}) {
  const gradientClass =
    variant === "earth"
      ? "text-earth-gradient"
      : variant === "climate"
        ? "text-climate-gradient"
        : "text-gradient";

  return <span className={`${gradientClass} ${className}`}>{children}</span>;
}

export function SkyvidyaGradientBackground({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "ocean" | "earth" | "climate";
}) {
  const gradientClass =
    variant === "earth"
      ? "bg-earth-gradient"
      : variant === "climate"
        ? "bg-climate-gradient"
        : "bg-ocean-gradient";

  return <div className={`${gradientClass} ${className}`}>{children}</div>;
}
