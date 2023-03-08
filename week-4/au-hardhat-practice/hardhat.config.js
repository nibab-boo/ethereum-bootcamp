require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.TESTNET_ALCHEMY_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
  },
};
