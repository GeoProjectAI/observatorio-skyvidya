/**
 * Theme management for the SKYVIDYA platform
 */

type ThemeMode = "light" | "dark" | "system";

class ThemeManager {
  private storageKey = "skyvidya-theme";

  constructor() {
    // Initialize theme on load
    this.initTheme();

    // Listen for system preference changes
    this.listenForSystemChanges();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(
      this.storageKey,
    ) as ThemeMode | null;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Default to system preference
      this.setTheme("system");
    }
  }

  private listenForSystemChanges(): void {
    // Watch for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const currentTheme = localStorage.getItem(
        this.storageKey,
      ) as ThemeMode | null;
      if (currentTheme === "system") {
        this.applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
  }

  public getTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(
      this.storageKey,
    ) as ThemeMode | null;
    return savedTheme || "system";
  }

  public setTheme(theme: ThemeMode): void {
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme(theme);

    // Dispatch event for components to react
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  private applyTheme(theme: ThemeMode): void {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  public toggleTheme(): void {
    const currentTheme = this.getTheme();

    if (currentTheme === "light") {
      this.setTheme("dark");
    } else if (currentTheme === "dark") {
      this.setTheme("system");
    } else {
      this.setTheme("light");
    }
  }
}

// Create a singleton instance
export const themeManager = new ThemeManager();

// Export a hook for React components
export function useTheme() {
  return themeManager;
}
