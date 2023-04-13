const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    let notAllowedAmount = ethers.utils.parseUnits("1", "ether");
    const [owner] = await ethers.getSigners();

    return { faucet, owner, notAllowedAmount };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow the withdrawal of over 0.1 ETH", async function () {
    const { faucet, notAllowedAmount } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.withdraw(notAllowedAmount)).to.be.reverted;
  });

  it("should be destroyed by owner", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    await faucet.destroyFaucet();

    expect(await faucet.provider.getCode(faucet.address)).to.hexEqual("0x");
  });
  it("should allow owner to withdraw all ether", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdrawAll()).to.not.reverted;
  });
});
