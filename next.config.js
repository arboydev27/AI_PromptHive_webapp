/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'experimental' keys as 'appDir' is enabled by default
  serverExternalPackages: ["mongoose"], // Move from experimental to root

  images: {
    domains: ["lh3.googleusercontent.com"], // Allow external image domains
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Keep your top-level await config
    };
    return config;
  },
};

module.exports = nextConfig;
