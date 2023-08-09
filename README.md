# Solutions base template

This repository allows you to bootstrap in to development with solidity and OpenZeppelin tools and libraries.

It also introduces simple CI tests for linting and codespell as well as  issue and PR templates. 



## Usage

### Hardhat & Contracts
use `sample.env` to make `.env` file for hardhat

there are ERC20/721/1155 mocks available in `/contracts`

If you don't need them - remove those. Just keep in mind that empty contracts directory will cause linter CI to fail 

### Autotasks
If you want to use rollup: in `/defender` directory:
```
mv sample.rollup.config.js rollup.config.js
mv sample.package.json package.json
```
Modify rollup and package files as you need. Dummy autotask is given as well. 

### Defender
in `defender/` directory:

```
mv sample.secrets.yml ./secrets/dev.yml
mv sample.config.yml config.dev.yml
```
fill values, remove unneeded fields

In `serverless.yml` variety of resources is given. Optional fields are commented out.

Modify ones you need, remove rest.

### Ready. Steady. Go
```
yarn
yarn compile 
# cd & build any autotasks if need to
sls deploy
```
