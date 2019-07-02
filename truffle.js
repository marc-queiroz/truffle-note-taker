module.exports = {
  compilers: {
    solc: {
      version: "0.4.16",
    },
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 7600000,
      gasPrice: 200000000,
      network_id: "*" // Match any network id
    }
  }
};
