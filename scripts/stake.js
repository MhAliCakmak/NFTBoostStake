const hre = require('hardhat');

async function main() {
  const Staking = await hre.ethers.getContractFactory('Staking');
  const staking = await Staking.deploy(
    '0x2E376F382F50496F919f12947785A63517a136D4',
    '0x2E376F382F50496F919f12947785A63517a136D4',
    '0xb394859Da70ceD8C3A904b6fe8C82cBF7e262D92',
  );

  await staking.deployed();
  console.log('Staking deployed to:', staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
