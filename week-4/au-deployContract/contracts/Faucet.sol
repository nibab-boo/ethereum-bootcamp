// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Faucet {
  
  function withdraw(uint _amount) public {
    // user can draw only 0.05 ETH at a time
    require(_amount <= 50000000000000000);
    payable(msg.sender).transfer(_amount);
  }

  // fallback function
  receive() external payable {}
}