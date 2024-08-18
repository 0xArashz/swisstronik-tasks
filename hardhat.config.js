require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x${privateKey}`],
    },
  },
};
