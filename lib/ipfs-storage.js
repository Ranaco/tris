import { Web3Storage } from "web3.storage";

const createWeb3Storage = () => {
  return new Web3Storage({ token: process.env.NFT_API_KEY });
};

const uploadFile = async ({ file }) => {
  const storage = createWeb3Storage();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const newFile = new File([file], fileName, { type: file.type });
  const cid = await storage.put([newFile], {
    name: fileName,
  });
  return cid;
};

export { uploadFile };
