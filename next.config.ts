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

  // Opt-out packages from bundling (Next.js 15 stable API)
  serverExternalPackages: [
    "@imgly/background-removal-node",
    "onnxruntime-node",
    "sharp"
  ],

  // Exclude large binary files from the serverless function bundle
  experimental: {
    outputFileTracingExcludes: {
      '/api/remove-background': [
        'node_modules/onnxruntime-node/bin/**/*',
        'node_modules/@imgly/background-removal-node/dist/**/*',
      ],
    },
  },

  webpack: (config: Configuration, { isServer }: WebpackContext) => {
    // Only apply these rules on the server side
    if (isServer) {
      // Externalize onnxruntime-node to use native Node.js require
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          'onnxruntime-node': 'commonjs onnxruntime-node',
        });
      }
    }

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Handle ONNX model files
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
