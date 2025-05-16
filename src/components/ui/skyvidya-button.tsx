import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import type { ButtonProps } from "./button";

interface SkyvidyaButtonProps extends Omit<ButtonProps, "asChild"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

export function SkyvidyaButton({
  variant = "primary",
  size = "md",
  className,
  children,
  iconLeft,
  iconRight,
  asChild = false,
  ...props
}: SkyvidyaButtonProps) {
  const variantClasses = {
    primary: "bg-skyvidya-cta hover:bg-skyvidya-cta/90 text-white",
    secondary: "bg-skyvidya-deepBlue hover:bg-skyvidya-deepBlue/90 text-white",
    outline:
      "border border-skyvidya-deepBlue text-skyvidya-deepBlue hover:bg-skyvidya-deepBlue/10",
    ghost: "text-skyvidya-deepBlue hover:bg-skyvidya-deepBlue/10",
    link: "text-skyvidya-deepBlue underline-offset-4 hover:underline p-0 h-auto",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm rounded",
    md: "py-2 px-4 rounded-md",
    lg: "py-3 px-6 text-lg rounded-lg",
  };

  return (
    <Button
      className={cn(
        "font-medium transition-colors flex items-center justify-center gap-2",
        variantClasses[variant],
        variant !== "link" && sizeClasses[size],
        className,
      )}
      asChild={asChild}
      {...props}
    >
      {!asChild ? (
        <>
          {iconLeft && <span className="inline-flex">{iconLeft}</span>}
          {children}
          {iconRight && <span className="inline-flex">{iconRight}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
