import TrisContractAbi from '../lib/contracts/TrisNFT.json';
import UseContractAbi from '../lib/contracts/UserContract.json';

const loadContracts =async ({ state, setState, web3 }) => {
  let Tris, User;
  const TrisNetworkData = TrisContractAbi.networks[80001];
  const UseNetworkData = UseContractAbi.networks[80001]
  if (TrisNetworkData && UseNetworkData && web3 !== undefined) {
    const TrisAbi = TrisContractAbi.abi;
    const TrisAddress = TrisNetworkData.address;
    const UserAbi = UseContractAbi.abi;
    const UserAddress = UseNetworkData.address;
    try {
       Tris = new web3.eth.Contract(TrisAbi, TrisAddress);
       User = new web3.eth.Contract(UserAbi, UserAddress);
       console.log("This is the main User and Tris contract :: ", User, Tris);
      setState((val) => {
        return {
          ...val,
          TrisNft: Tris,
          UserContract: User,
        }
      })
    } catch (err) {
      window.alert(err);
    }
    return { Tris, User };
  }
}

export default loadContracts;
