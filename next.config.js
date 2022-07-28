module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.pravatar.cc", "xsgames.co", "ipfs.io"],
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
      TRIS_NFT:"0xa19593f1463eE9779fF58371CEe8b8F825Af489b",
      USER_CONTRACT:"0x8e6Ec0d8B4Cafd6f63fc71B0EFA4A3ea362a433f"
  },
};
