/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.jsx/,
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};

module.exports = nextConfig;
