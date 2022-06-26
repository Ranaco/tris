module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'i.pravatar.cc',
      'xsgames.co'
    ],
  },
  experimental: {
    images: {
      optimizeImages: true,
      layoutRaw: true,
      lazyload: true,
    }
  }
}
