module.exports = {
    async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'https://api.fortitudenorth.com/:path*',
          },
        ]
      },
  };