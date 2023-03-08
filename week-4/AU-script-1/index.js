require('dotenv').config();
const { Wallet, Mnemonic } = require('ethers');
const ethers = require('ethers');

const contractABI = [
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dec',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'get',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const provider = new ethers.AlchemyProvider(
  'goerli',
  process.env.TESTNET_ALCHEMY_KEY
);

const wallet = Wallet.fromPhrase(process.env.TESTNET_SEED_PHRASE, provider);

async function main() {
  // new ethers.Contract( address, abi, signerOrProvider 
  const counterContract = new ethers.Contract(
    '0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A',
    contractABI,
    wallet
  )

  const tx =await counterContract.inc();
  const currentCounterValue = await counterContract.get();
  console.log("Value: ", currentCounterValue.toString());
  console.log("Txn :- ", tx);
}

main(); 

