const Tris = artifacts.require("TrisNFT");
const User = artifacts.require("UserContract");

module.exports = async function (deployer) {
  deployer.deploy(Tris);
  const address = await Tris.address
  deployer.deploy(User, address, "0x9E7BD21f0b8e1Cc9E4bFc0C8C5d603Fd979760B6")
}
