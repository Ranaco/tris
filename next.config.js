module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.pravatar.cc", "xsgames.co", "ipfs.io", "i.gifer.com"],
    loader: 'akamai',
    path: ''
  },
  experimental: {
    images: {
      layoutRaw: true,
      lazyload: true,
    },
  },
  env: {
    NFT_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNEZjE4RmY2NUQzMzRDMzIzZkEyQkFEOTcwQTMxODQ0MkI3ODU2QTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzIwMTIyMDU1NiwibmFtZSI6IlRyaXMifQ.5KDXBvnidEGrY9AHCJ8-cS4yugBvUmGtJSPmxWti07U",
      TRIS_NFT:"0xe480D513335DbD098938d988AeaCa4B4A6a827E1",
      USER_CONTRACT:"0x6Fe0E6C87134A928b08A5cb858F381C7909379BE"
  },
};
