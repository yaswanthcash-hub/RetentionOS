/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment anywhere
  output: 'export',
  
  // Image optimization settings
  images: {
    unoptimized: true,
  },
  
  // Add trailing slashes to URLs
  trailingSlash: true,
  
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Use SWC minifier for faster builds
  swcMinify: true,
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features (optional)
  experimental: {
    // Server Actions are now available by default in Next.js 14+
  },
  
  // Environment variables that should be available on the client
  env: {
    APP_NAME: 'RetentionOS',
    APP_VERSION: '1.0.0',
  },
}

module.exports = nextConfig
