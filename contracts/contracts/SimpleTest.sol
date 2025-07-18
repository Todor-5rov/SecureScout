// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleTest is Ownable {
    
    string public message;
    uint256 public counter;
    
    constructor() Ownable(msg.sender) {
        message = "Hello World";
        counter = 0;
    }
    
    function setMessage(string memory newMessage) external onlyOwner {
        message = newMessage;
    }
    
    function increment() external {
        counter++;
    }
    
    function getMessage() external view returns (string memory) {
        return message;
    }
    
    function getCounter() external view returns (uint256) {
        return counter;
    }
} 