import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-truffle5';
import '@nomiclabs/hardhat-web3';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import 'hardhat-contract-sizer';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage'
import { task } from 'hardhat/config';
import { deploy } from './scripts/deployContract';
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || 'https://eth-goerli.alchemyapi.io/v2/your-api-key';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'Your etherscan API key';

task('deployContract', 'Deploys contract')
  .addParam('contractName', 'contract name')
  .addOptionalVariadicPositionalParam('constructorArgs', 'Constructor arguments')
  .setAction(async (taskArgs, hre) => {
    const address = await deploy({
      hre,
      contractName: taskArgs.contractName,
      constructorArgs: taskArgs.constructorArgs,
    });
    console.log('Deployed ', taskArgs.contractName, 'at: ', address);
  });

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

export default {
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  paths: {
    sources: './contracts',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: 'types/typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS,
    outputFile: process.env.REPORT_GAS_PATH,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    format: 'json',
    spacing: 2,
    pretty: false,
  },
};
