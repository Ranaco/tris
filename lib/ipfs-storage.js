import { Web3Storage } from "web3.storage";

const createWeb3Storage = () => {
  return new Web3Storage({ token: process.env.NFT_API_KEY });
};

const uploadFile = async ({ file, setProgress }) => {
  setProgress != undefined ? setProgress('File parsing started.') : undefined
  const storage = createWeb3Storage();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const newFile = new File([file], fileName, { type: file.type });
  setProgress != undefined ? setProgress('Uploading to IPFS.') : undefined
  const cid = await storage.put([newFile], {
    name: fileName,
  });
  setProgress != undefined ? setProgress("Uploaded to IPFS.") : undefined
  return cid;
};

const getFile = async ({ cid }) => {

}

export { uploadFile, getFile };
