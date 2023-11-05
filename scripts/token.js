const hre = require('hardhat');

async function main() {
  const BoostStakeToken = await hre.ethers.getContractFactory('BoostStakeToken');
  const boostStakeToken = await BoostStakeToken.deploy();

  await boostStakeToken.deployed();
  console.log('tokenContract deployed to:', boostStakeToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
