module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.pravatar.cc", "xsgames.co"],
  },
  experimental: {
    images: {
      optimizeImages: true,
      layoutRaw: true,
      lazyload: true,
    },
  },
  env: {
    NFT_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU1NTA5MEM4OTU5NTI1ODhiZWIyYkZkZDUxNzU2OEQ4OTY5OTFjNDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTcyMDQyMTI1MDIsIm5hbWUiOiJUcmlzIn0.JEOMMyX0mOODXXT6rPYZZrI9TDmlNF-m0UFTTx93GpI",
  },
};
