// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Emit {
    function emitMe(address winner) external {
        (bool status, ) = winner.call(
            abi.encodeWithSignature("attempt()")
        );
        require(status);
    }
}