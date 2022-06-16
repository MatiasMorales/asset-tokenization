var MTEToken = artifacts.require("MTEToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function(deployer) {

    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MTEToken, 1000000);
    await deployer.deploy(MyTokenSale, 1, addr[0], MTEToken.address);

    let instance = await MTEToken.deployed();
    await instance.transfer(MyTokenSale.address, 1000000);
}
