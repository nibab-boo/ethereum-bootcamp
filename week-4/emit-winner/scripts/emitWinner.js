const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x7dC6E091Cdc82Bdb6100156Dd5F5a8B2691d43D2";

async function emitWinner() {

  const emit = await hre.ethers.getContractAt("Emit", CONTRACT_ADDRESS);

  const response = await emit.emitMe('0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502');

  // console.log("Response :---: ", response);
}

emitWinner()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });