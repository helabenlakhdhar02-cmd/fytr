/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable image optimization
  images: {
    domains: ['127.0.0.1', 'localhost', 'fytr-1.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fytr-1.onrender.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize page loading
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Environment variables
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://fytr-1.onrender.com',
  },
  // Add redirects
  async redirects() {
    return [
      {
        source: '/projects-list',
        destination: '/website/projects',
        permanent: true,
      },
      {
        source: '/website/works',
        destination: '/website/projects',
        permanent: true,
      },
      {
        source: '/services-list',
        destination: '/website/services',
        permanent: true,
      },
      {
        source: '/dashboard/feed',
        destination: '/dashboard/home',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/website/projects',
        permanent: true,
      },
      {
        source: '/freelancers-list',
        destination: '/fytrs',
        permanent: true,
      },
      // Redirect old clante routes to new client routes
      {
        source: '/clante/dashboard',
        destination: '/client/dashboard',
        permanent: true,
      },
      {
        source: '/clante/analytics',
        destination: '/client/analytics',
        permanent: true,
      },
      {
        source: '/clabte',
        destination: '/project-details',
        permanent: true,
      },
      {
        source: '/clabte-client',
        destination: '/client/projects',
        permanent: true,
      },
      {
        source: '/clabte-freelancer',
        destination: '/dashboard/active-projects',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
