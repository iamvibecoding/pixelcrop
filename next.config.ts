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
    // Ensure module and rules exist
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Keep the native background-removal package external on the server
    // Note: We don't need the `isServer` check here if using serverExternalPackages
    // config.externals = (config.externals || []) as ExternalItem[];
    // if (isServer) {
    //   (config.externals as unknown[]).push({
    //     "@imgly/background-removal-node": "commonjs @imgly/background-removal-node",
    //   });
    // }

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

  // --- FIX: Use the new key ---
  serverExternalPackages: ["@imgly/background-removal-node"],

  // Remove the old experimental key if it's still there
  // experimental: {
  //   serverComponentsExternalPackages: ["@imgly/background-removal-node"],
  // },
};

export default nextConfig;