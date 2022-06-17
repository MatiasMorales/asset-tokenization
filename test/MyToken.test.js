require("dotenv").config({path: "../.env"});

const MTEToken = artifacts.require("MTEToken.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    const [deployerAccount, recipientAccount, anotherAccount] = accounts;

    beforeEach(async() => {
        this.mteToken = await MTEToken.new(process.env.INITIAL_SUPPLY);
    })

    it("all tokens should be in my account", async () => {
        let instance = this.mteToken;
        let totalSupply = await instance.totalSupply();
        
        return Promise.all([
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)  
        ])
    });

    it("is possible to send tokens between accounts", async () => {
        const numTokens = 1
        const instance = this.mteToken;
        const totalSupply = await instance.totalSupply(); 

        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipientAccount, numTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(numTokens)));
        await expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(numTokens));
    });

    it("is not possible to send more tokens than available in total", async () => {
        const instance = this.mteToken;
        const balanceOfDeployer = await instance.balanceOf(deployerAccount);

        await expect(instance.transfer(recipientAccount, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});
