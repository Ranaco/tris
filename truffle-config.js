const path = require('path');

module.exports = {
  contracts_build_directory: path.join(__dirname, "lib/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  compilers: {
    solc: {
      version: "0.8.15",      // Fetch exact version from solc-bin (default: truffle's version)
   }
  },
};
