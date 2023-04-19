//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Agreement {
    address public person1 = msg.sender;
    address public person2;
    string private message = "No message yet!";

    constructor(address other, string memory initMsg) {
        person2 = other;
        message = initMsg;
    }

    function setMessage(string memory newmsg) public {
        require(msg.sender == person1 || msg.sender == person2);
        message = newmsg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
