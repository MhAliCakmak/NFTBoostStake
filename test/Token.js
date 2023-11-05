const { assert, expect } = require('chai');
const { ethers } = require('hardhat');

const { provider } = ethers;
const helpers = require('@nomicfoundation/hardhat-network-helpers');

describe('BoostStakeToken', () => {
  let BoostStakeToken; let boostStakeToken; let owner; let addr1; let
    addr2;

  beforeEach(async () => {
    BoostStakeToken = await ethers.getContractFactory('BoostStakeToken');
    [owner, addr1, addr2, _] = await ethers.getSigners();
    boostStakeToken = await BoostStakeToken.deploy(owner.address);
  });

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await boostStakeToken.owner()).to.equal(owner.address);
    });

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await boostStakeToken.balanceOf(owner.address);
      expect(await boostStakeToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('Should transfer tokens between accounts with tax if sender is not whitelisted', async () => {
      await boostStakeToken.mint(addr1.address, 1000);
      await boostStakeToken.connect(addr1).transfer(addr2.address, 1000);
      const addr1Balance = await boostStakeToken.balanceOf(addr1.address);
      const addr2Balance = await boostStakeToken.balanceOf(addr2.address);
      const ownerBalance = await boostStakeToken.balanceOf(owner.address);

      assert.equal(addr1Balance.toNumber(), 0);
      assert.equal(addr2Balance.toNumber(), 950);
      assert.equal(ownerBalance.toNumber(), 50);
    });

    it('Should transfer tokens between accounts without tax if sender is whitelisted', async () => {
      await boostStakeToken.mint(addr1.address, 1000);
      await boostStakeToken.addToWhitelist(addr1.address, { from: owner.address });
      await boostStakeToken.connect(addr1).transfer(addr2.address, 1000);
      const addr1Balance = await boostStakeToken.balanceOf(addr1.address);
      const addr2Balance = await boostStakeToken.balanceOf(addr2.address);

      assert.equal(addr1Balance.toNumber(), 0);
      assert.equal(addr2Balance.toNumber(), 1000);
    });
  });
});
