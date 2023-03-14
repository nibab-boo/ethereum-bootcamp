// import testing libraries: https://www.chaijs.com/guide/styles/
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", async function () {
  it("should change x to 1337", async function () {
  
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");
    
    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10);
    
    // wait for contract to be deployed and validated!
    await contract.deployed();
    
    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    assert.equal(newX.toNumber(), 1337);
  });

  it("should add 20 to x", async function() {

    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    const contract = await ModifyVariable.deploy(10);

    await contract.deployed();

    await contract.add(10);

    const newX = await contract.x();
    assert.equal(newX.toNumber(), 20);
  });

  it("'modified' should be to 'false'", async function () {

    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    const contract = await ModifyVariable.deploy(10);

    await contract.deployed();

    const modifiedState = await contract.modified();

    assert.equal(modifiedState, false);    
  });

  it("'modified' should be change to 'true'", async function () {

    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    const contract = await ModifyVariable.deploy(10);

    await contract.deployed();
    
    await contract.minus(5);
    
    const modifiedState = await contract.modified();

    assert.equal(modifiedState, true);
  });
});