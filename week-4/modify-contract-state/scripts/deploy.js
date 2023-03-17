const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const url = process.env.GOERLI_URL;

  /*
    After running `npx hardhat compile`, 
    'artifacts' folder pop up in your project directory 
  */
  const artifacts = await hre.artifacts.readArtifact("ModifyVariable");

  const provider = new ethers.providers.JsonRpcProvider(url);

  const privateKey = process.env.PRIVATE_KEY;

  const wallet = new ethers.Wallet(privateKey, provider);

  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  )

  let modifiedVariable = await factory.deploy(10);

  console.log("Modified Variable : ", modifiedVariable.address);

  await modifiedVariable.deployed();
}

main()
  .then(() => process.exit(0))
  .then((error) => {
    console.error(error);
    process.exit(1);
  })