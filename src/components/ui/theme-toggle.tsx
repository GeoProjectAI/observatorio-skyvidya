import { useEffect, useState } from "react";
import { Button } from "./button";
import { Sun, Moon, Monitor } from "lucide-react";
import { themeManager } from "@/lib/theme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(themeManager.getTheme());

  useEffect(() => {
    // Update state when theme changes
    const handleThemeChange = (e: CustomEvent<ThemeMode>) => {
      setTheme(e.detail);
    };

    window.addEventListener("themechange", handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(
        "themechange",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  const handleToggle = () => {
    themeManager.toggleTheme();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleToggle}>
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "system" && <Monitor className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Current theme: {theme}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
