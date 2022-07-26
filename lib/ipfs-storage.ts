import { NFTStorage, File } from "nft.storage";

const API_KEY = process.env.NFT_API_KEY

const createWeb3Storage = () => {
  const storage: NFTStorage = new NFTStorage({ token: API_KEY })
  return storage
};

const uploadFileWithState = async ({ file, setProgress }) => {
  console.log("This is the start for the IPFS process....")
  setProgress != undefined ? setProgress('File parsing started.') : undefined
  const storage: NFTStorage = new NFTStorage({ token: API_KEY })
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const newFile = new File([file], fileName, { type: file.type });
  setProgress != undefined ? setProgress('Uploading to IPFS.') : undefined
  const url = await storage.store({
    image: newFile,
    name: fileName,
    description: "Tris"
  })
  console.log("This is the url :: ", url)
  setProgress != undefined ? setProgress("Uploaded") : undefined
  return url.data.image.href
};

const uploadFile = async ({ file }) => {
  console.log("This is the start for the IPFS process....")
  const storage: NFTStorage = new NFTStorage({ token: API_KEY })
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const newFile = new File([file], fileName, { type: file.type });
  console.log("Starting upload")
  const url = await storage.store({
    image: newFile,
    name: fileName,
    description: "Tris"
  })
  console.log("This is the url :: ", url)
  return url.data.image.href
}

const parseUserData = async ({ User }) => {

  const rawUrl = (User.avatarUrl as string).replace("ipfs://", '')
  const parsedUrl = "https://ipfs.io/ipfs/" + rawUrl

  const parsedData = {
    name: User.name,
    userName: User.userName,
    profileUrl: parsedUrl,
    wallUrl: User.wallUrl,
    address: User.userAddress,
    following: User.following,
    followingCount: User.followingCount,
    followers: User.followers,
    followersCount: User.followersCount,
    postCount: User.postCount,
    bio: User.bio,
    email: User.email
  }
  return parsedData
}

export { uploadFileWithState, uploadFile, parseUserData };
