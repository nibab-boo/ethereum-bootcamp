// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Faucet {
  address payable public owner;

  constructor() payable {
    owner = payable(msg.sender);
  }

  function withdraw(uint _amount) payable public {
    require(_amount <= 100000000000000000, "Maximum of .1 ETH allowed for withdrawal");
    (bool status, ) = payable(msg.sender).call{ value: _amount }("");
    require(status, "Failed to send Ether");
  }

  // withdrawAll() => onlyOwner (modifier) public ->
  function withdrawAll() onlyOwner public {
    (bool status, ) = owner.call{ value: address(this).balance }("");
    require(status, "Failed to send Ether");
  }

  function destroyFaucet() onlyOwner public {
    selfdestruct(owner);
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
}