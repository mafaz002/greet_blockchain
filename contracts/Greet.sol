//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greet {
    string public message;

    constructor(string memory _message) {
        console.log("Constructor...", _message);
        message = _message;
    }

    function greet() public view returns (string memory) {
        return message;
    }

    function update(string memory _newMessage) public {
        console.log("Update...", _newMessage);
        message = _newMessage;
    }
}
