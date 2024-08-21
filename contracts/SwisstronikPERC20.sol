// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PERC20.sol";


contract SwisstronikPERC20 is PERC20 {
    constructor()
        PERC20("Swisstronik PERC20", "SWPERC20")
    {}
    function balanceOf(address account) public view override returns (uint256) {
        require(msg.sender == account, "SwisstronikPERC20: msg.sender != account");
        return _balances[account];
    }
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        require(msg.sender == spender, "SwisstronikPERC20: msg.sender != account");
        return _allowances[owner][spender];
    }
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}