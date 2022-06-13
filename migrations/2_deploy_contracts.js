const MTEToken = artifacts.require("MTEToken.sol");

module.exports = async function(deployer) {
    await deployer.deploy(MTEToken, 1000000);
}
