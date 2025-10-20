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

  // MOVED: outputFileTracingExcludes is now a top-level property in Next.js 15
  outputFileTracingExcludes: {
    '/api/remove-background': [
      'node_modules/@imgly/background-removal-node/**/*',
      'node_modules/onnxruntime-node/**/*',
    ],
  },

  serverExternalPackages: [
    "@imgly/background-removal-node",
    "onnxruntime-node",
  ],

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
};

export default nextConfig;
