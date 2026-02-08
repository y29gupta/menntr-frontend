module.exports = {
  // output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://menntr-backend.onrender.com/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};
