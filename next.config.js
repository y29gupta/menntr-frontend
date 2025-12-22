module.exports = {
  // output: 'export',
   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://menntr-backend.onrender.com/:path*',
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};
