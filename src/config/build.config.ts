
// Build configuration to handle development vs production modes
export const buildConfig = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  skipTypeCheck: process.env.SKIP_TYPE_CHECK === 'true',
  useSWC: true, // Always use SWC for better performance
  
  // Lovable-tagger configuration
  enableTagger: process.env.NODE_ENV === 'production',
  
  // TypeScript compilation options
  typescript: {
    noEmit: false,
    incremental: true,
    skipLibCheck: true,
  }
};

// Export for use in other configuration files
export default buildConfig;
