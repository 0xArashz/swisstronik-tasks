require("@nomicfoundation/hardhat-toolbox");


const PRIVATE_KEY = vars.get("PRIVATE_KEY");

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.24",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
