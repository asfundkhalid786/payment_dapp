const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const dappFactory = require('./build/CreateDappinstance.json');

const provider = new HDWalletProvider(
    
  'hotel like odor mention pumpkin able soft market ignore few write belt',
  'https://rinkeby.infura.io/v3/ce88547915764419ab7043970152f527'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(dappFactory.interface)
  )
    .deploy({ data: dappFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();