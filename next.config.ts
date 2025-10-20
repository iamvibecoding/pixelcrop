import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

interface WebpackContext {
  isServer: boolean;
}

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config: Configuration, { isServer }: WebpackContext) => {
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
  serverExternalPackages: ["@imgly/background-removal-node"],
};

export default nextConfig;
