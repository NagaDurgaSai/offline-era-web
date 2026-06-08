/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.177'],
  output: 'export',
  images: { unoptimized: true },
  basePath: '/offline-era-web',
  assetPrefix: '/offline-era-web',
  trailingSlash: true,
}

module.exports = nextConfig
