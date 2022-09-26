import web3 from './web3';
import CampaignFactory from './build/CreateDappinstance.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5cA3160Bb6196Ce73C9A4b70af017c80B12a04AD'
);

export default instance;