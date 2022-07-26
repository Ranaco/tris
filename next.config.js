module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.pravatar.cc", "xsgames.co", "ipfs.io"],
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNEZjE4RmY2NUQzMzRDMzIzZkEyQkFEOTcwQTMxODQ0MkI3ODU2QTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzIwMTIyMDU1NiwibmFtZSI6IlRyaXMifQ.5KDXBvnidEGrY9AHCJ8-cS4yugBvUmGtJSPmxWti07U",
      USER_CONTRACT:"0x1aaE756E1F0A15ddfEF073b4916b5083aba19492",
      TRIS_NFT:"0x8Eb4A6a3Cb1a6909B85A8069135d469ff3B9795d"
  },
};
