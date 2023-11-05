const hre = require('hardhat');

async function main() {
  const BoostStakeNFTs = await hre.ethers.getContractFactory('BoostStakeNFTs');
  const boostStakeNFTs = await BoostStakeNFTs.deploy();

  await boostStakeNFTs.deployed();
  console.log('boostStakeNFTs deployed to:', boostStakeNFTs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
