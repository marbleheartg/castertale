// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract Flowey is ERC1155, Ownable {
    uint256 public constant PRICE = 0.00009 ether;

    constructor(address initialOwner) ERC1155("ipfs://bafybeic3ugkjalx5ko74vbau25ue3zho7oyxn66ireebishglczz7kf6u4/{id}.json") Ownable(initialOwner) {}

    function mint() public payable {
        require(msg.value >= PRICE, "Not enough ETH");
        _mint(msg.sender, 0, 1, "");
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
