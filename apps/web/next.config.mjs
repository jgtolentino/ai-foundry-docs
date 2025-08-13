/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/retailbot',
        destination: '/ask-suqi',
        permanent: true,
      },
      {
        source: '/scout-analytics/:path*',
        destination: '/suqi-analytics/:path*',
        permanent: true,
      },
    ]
  },
  transpilePackages: ['@suqi/ui', '@suqi/charts', '@suqi/core', '@suqi/data'],
}

export default nextConfig