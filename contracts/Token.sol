// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BoostStakeToken is ERC20, Ownable, ERC20Permit {
    uint256 public taxRate = 5; // 5%
    mapping(address => bool) public whitelist;

    constructor(
        address initialOwner
    )
        ERC20("Boost Stake Token", "BST")
        ERC20Permit("Boost Stake Token")
    {
        transferOwnership(initialOwner);
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        if (!whitelist[sender]) {
            uint256 tax = (amount * taxRate) / 100;
            super._transfer(sender, recipient, amount - tax);
            super._transfer(sender, owner(), tax);
        } else {
            super._transfer(sender, recipient, amount);
        }
    }

    function updateTax(uint _tax) external onlyOwner {
        taxRate = _tax;
    }

    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    function removeFromWhitelist(address _address) external onlyOwner {
        whitelist[_address] = false;
    }
}
