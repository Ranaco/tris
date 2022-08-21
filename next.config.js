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
      TRIS_NFT:"0x755EF98BcC35C50E302899848F8c16aaef930aB3",
      USER_CONTRACT:"0x36518d6246e72d6cBE9bA1F3ddBb5342F07444Db"
  },
};
