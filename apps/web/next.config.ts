import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@originstep/supabase',
    '@originstep/types',
    '@originstep/api',
    '@originstep/utils',
  ],
}

export default nextConfig
