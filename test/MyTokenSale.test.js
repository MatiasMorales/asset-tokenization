require("dotenv").config({path: "../.env"});

const chai = require("./chaiSetup.js");
const expect = chai.expect;

const BN = web3.utils.BN;
const TokenSale = artifacts.require("MyTokenSale");
const MTEToken = artifacts.require("MTEToken");

contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipientAccount, anotherAccount] = accounts;

    it("should not have any tokens in my deployer account", async () => {
        let instance = await MTEToken.deployed();
        
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
});