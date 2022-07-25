const Tris = artifacts.require("TrisNFT");
const User = artifacts.require("UserContract");

module.exports = async function (deployer) {
  deployer.deploy(Tris).then(function(){
  return deployer.deploy(User, Tris.address,"0xA9605c1819BF88140b0B8C6DBaC52A71746E3dB2")
  });
  
}
