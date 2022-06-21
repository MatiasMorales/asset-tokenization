require("dotenv").config({path: "../.env"});

const chai = require("./chaiSetup.js");
const expect = chai.expect;

const BN = web3.utils.BN;
const TokenSale = artifacts.require("MyTokenSale");
const MTEToken = artifacts.require("MTEToken");
const KycContract = artifacts.require("KycContract");

contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipientAccount, anotherAccount] = accounts;

    it("should not have any tokens in my deployer account", async () => {
        let instance = await MTEToken.deployed();
        
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the TokenSale Smart Contract by default", async () => {
        let instance = await MTEToken.deployed();
        let totalSupply = await instance.totalSupply();
        let tokenSaleBalance = await instance.balanceOf(TokenSale.address);
        
        return await expect(tokenSaleBalance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy tokens", async () => {
        let instance = await MTEToken.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBeforeBuy = await instance.balanceOf(deployerAccount);
        
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        
        await expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBeforeBuy.add(new BN(1)));
    });
});
