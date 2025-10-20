import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

interface WebpackContext {
  isServer: boolean;
}

interface CustomNextConfig extends NextConfig {
  webpack?: (config: Configuration, options: WebpackContext) => Configuration;
}

const nextConfig: CustomNextConfig = {
  // Disable ESLint during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config: Configuration, { isServer }: WebpackContext) => {
    // Ensure module and rules exist
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Handle model asset files correctly
    config.module.rules.push({
      test: /\.(onnx|bin|tflite|dat)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    } as RuleSetRule);

    return config;
  },

  // Keep background-removal package external on server
  serverExternalPackages: ["@imgly/background-removal-node"],
};

export default nextConfig;
