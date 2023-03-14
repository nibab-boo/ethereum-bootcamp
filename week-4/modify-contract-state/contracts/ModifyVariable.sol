// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;

  constructor(uint _x) {
    x = _x;
  }

  function modifyToLeet()  public {
    x = 1337;
  }

  function minus(uint num) external {
    x -= num;
  }

  function add(uint num) external {
    x += num;
  }

}