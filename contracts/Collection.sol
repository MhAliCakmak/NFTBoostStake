// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BoostStakeNFTs is ERC1155, Ownable {
    uint256 public constant BRONZE = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant GOLD = 2;
    uint256 public constant PLATINIUM = 3;

    mapping(uint256 => bool) private _hasBeenTransferred;

    mapping(uint256 => string) private _uris;


    constructor()
        public
        ERC1155(
            "https://bafybeia2xldayqnlyn6v4ai2mnwe6fgweqauxrt7az5ezvsepqrkxu7koi.ipfs.dweb.link/{id}.json"
        )
    {
        _mint(msg.sender, BRONZE, 100, "");
        _mint(msg.sender, SILVER, 100, "");
        _mint(msg.sender, GOLD, 100, "");
        _mint(msg.sender, PLATINIUM, 100, "");
    }

    function uri(uint256 tokenId) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://bafybeia2xldayqnlyn6v4ai2mnwe6fgweqauxrt7az5ezvsepqrkxu7koi.ipfs.dweb.link/",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override {
        require(!_hasBeenTransferred[id], "ERC1155: token has already been transferred");
        _hasBeenTransferred[id] = true;
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual override {
        for (uint256 i = 0; i < ids.length; ++i) {
            require(!_hasBeenTransferred[ids[i]], "ERC1155: one of the tokens has already been transferred");
            _hasBeenTransferred[ids[i]] = true;
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
