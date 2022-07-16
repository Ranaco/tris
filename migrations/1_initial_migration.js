const Tris = artifacts.require("TrisNFT");
const User = artifacts.require("User");

module.exports = function (deployer) {
  deployer.deploy(Tris);
};
