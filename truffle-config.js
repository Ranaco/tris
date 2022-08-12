const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const matic_key= process.env.MATIC_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `wss://polygon-mumbai.g.alchemy.com/v2/${matic_key}`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 300,
     // gas: 4700036,
      skipDryRun: false,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
 compilers: {
    solc: {
      version: "0.8.15",      // Fetch exact version from solc-bin (default: truffle's version)
   },
  }
}


  

