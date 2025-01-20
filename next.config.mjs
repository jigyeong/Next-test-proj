/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
  experimental: {
    swcPlugins: []
  }
};

export default nextConfig;
