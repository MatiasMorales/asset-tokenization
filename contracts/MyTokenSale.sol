// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {
    constructor(
        uint256 _rate,
        address payable _wallet,
        ERC20 _token
    ) Crowdsale(_rate, _wallet, _token) {}
}
