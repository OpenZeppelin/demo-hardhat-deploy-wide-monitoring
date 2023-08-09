type NetworkConfigItem = {
  name: string;
  blockConfirmations: number;
};

type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem;
};

export const networkConfig: NetworkConfigMap = {
  default: {
    name: "hardhat",
    blockConfirmations: 1,
  },
  31337: {
    name: "localhost",
    blockConfirmations: 1,
  },
  5: {
    name: "goerli",
    blockConfirmations: 5,
  },
};

export const developmentChains = ["hardhat", "localhost"];
