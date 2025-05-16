/**
 * SKYVIDYA Color System
 * A cohesive color palette for Earth intelligence visualization
 */

export const colors = {
  // Primary Colors
  primary: {
    deepBlue: "#1b7fa8", // Main brand color from logo/header
    seaBlue: "#4fb3ce", // Secondary blue
    skyBlue: "#65d0e6", // Light blue for accents
    vibrantGreen: "#69c998", // Green for success/positive indicators
    freshGreen: "#8edc7f", // Light green for secondary indicators
  },

  // Secondary Colors
  secondary: {
    coral: "#f7a58c", // Used for warnings/climate changes
    peach: "#ffc29e", // Light coral for secondary warnings
    teal: "#2aa1b7", // Teal for headers and titles
    mint: "#a5e1d2", // Light teal for backgrounds
  },

  // Neutral Colors
  neutral: {
    white: "#ffffff", // Clean interfaces
    lightGray: "#f5f7f9", // Card backgrounds
    mediumGray: "#e0e0e0", // Borders
    darkGray: "#555555", // Text and details
  },

  // UI Colors
  ui: {
    success: "#69c998",
    warning: "#ffc29e",
    danger: "#f7a58c",
    info: "#4fb3ce",
    cta: "#4cc38a", // Get Started button color
  },

  // Gradients
  gradients: {
    oceanToSky: "linear-gradient(135deg, #1b7fa8, #65d0e6)",
    earthTone: "linear-gradient(135deg, #69c998, #8edc7f)",
    warmClimate: "linear-gradient(135deg, #f7a58c, #ffc29e)",
    fullSpectrum:
      "linear-gradient(135deg, #1b7fa8, #4fb3ce, #65d0e6, #69c998, #8edc7f)",
    darkBlue: "linear-gradient(135deg, #0e3b5a, #1b7fa8)",
    coral: "linear-gradient(135deg, #f7a58c, #ffc29e)",
  },
};

// Helper function to get color with opacity
export const getColorWithOpacity = (colorHex: string, opacity: number) => {
  // Convert hex to rgba
  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
