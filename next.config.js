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
      TRIS_NFT:"0x4edA80e2582612585a2f4D9C3CBc2dAE97f209F9",
      USER_CONTRACT:"0x85d0FB03bDe8D9F5446660609D81505e895DaF15"
  },
};
