require("dotenv").config({path: "../.env"});

var MTEToken = artifacts.require("MTEToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function(deployer) {

    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MTEToken, process.env.INITIAL_SUPPLY);
    await deployer.deploy(MyTokenSale, 1, addr[0], MTEToken.address);

    let instance = await MTEToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_SUPPLY);
}
