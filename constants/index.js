import nftAbi from './collection.json';
import stakeAbi from './stake.json';
import tokenAbi from './token.json';

const TokenAddress = '0x2E376F382F50496F919f12947785A63517a136D4';
const StakeAddress = '0xdc152A13F14a4A46f4e25C45B9B674753BF0C67F';
const NFTAddress = '0xb394859Da70ceD8C3A904b6fe8C82cBF7e262D92';
const NFTAbi = nftAbi.abi;
const StakeAbi = stakeAbi.abi;
const TokenAbi = tokenAbi.abi;

export {
  TokenAddress, StakeAddress, NFTAddress, NFTAbi, StakeAbi, TokenAbi,
};
