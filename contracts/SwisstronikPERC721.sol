// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SwisstronikPERC721 is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Swisstronik PERC721", "SWPERC721")
        Ownable(initialOwner)
    {}
    function balanceOf(address account) public view override returns (uint256) {
        require(msg.sender == account, "SwisstronikPERC721: msg.sender != account");
        return super.balanceOf(account);
    }
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        require(msg.sender == operator, "SwisstronikPERC721: msg.sender != operator");
        return super.isApprovedForAll(owner, operator);
    }
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
