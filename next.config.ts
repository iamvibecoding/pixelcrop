/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Keep the background-removal package external on the server
    // to use its native runtime bindings.
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@imgly/background-removal-node");
    }
    return config;
  },
};

export default nextConfig;