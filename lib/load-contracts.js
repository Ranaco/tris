import TrisContractAbi from '../lib/contracts/TrisNFT.json';
import UseContractAbi from '../lib/contracts/UserContract.json';

const TrisAddress = process.env.TRIS_NFT
const UserAddress = process.env.USER_CONTRACT

const loadContracts =async ({ state, setState, web3 }) => {
  let Tris, User;
  if (web3 !== undefined) {
    const TrisAbi = TrisContractAbi.abi;
    const UserAbi = UseContractAbi.abi;
    try {
      Tris = new web3.eth.Contract(TrisAbi, TrisAddress);
      User = new web3.eth.Contract(UserAbi, UserAddress);
      console.log("This is the main User and Tris contract :: ", User, Tris);
      return { Tris, User };
    } catch (err) {
      window.alert(err);
    }
  }
}

export default loadContracts;
