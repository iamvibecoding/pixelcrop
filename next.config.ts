import type { NextConfig } from "next";
import type { Configuration, RuleSetRule, ExternalItem } from "webpack";

interface WebpackContext {
  isServer: boolean;
}

interface CustomNextConfig extends NextConfig {
  webpack?: (config: Configuration, options: WebpackContext) => Configuration;
}

const nextConfig: CustomNextConfig = {
  webpack: (config: Configuration, { isServer }: WebpackContext) => {
    // Ensure externals exists
    config.externals = (config.externals || []) as ExternalItem[];

    // Keep the native background-removal package external on the server
    if (isServer) {
      (config.externals as unknown[]).push({
        "@imgly/background-removal-node": "commonjs @imgly/background-removal-node",
      });
    }

    // Handle model asset files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(onnx|bin|tflite|dat)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    } as RuleSetRule);

    return config;
  },

  experimental: {
    serverComponentsExternalPackages: ["@imgly/background-removal-node"],
  },
};

export default nextConfig;
