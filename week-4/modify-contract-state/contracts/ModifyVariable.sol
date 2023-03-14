// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  bool public modified = false;

  constructor(uint _x) {
    x = _x;
  }

  function modifyToLeet()  public {
    modified = true;
    x = 1337;
  }

  function minus(uint num) external {
    modified = true;
    x -= num;
  }

  function add(uint num) external {
    modified = true;
    x += num;
  }

}