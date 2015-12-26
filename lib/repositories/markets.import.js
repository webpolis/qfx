export default markets = new Mongo.Collection('markets');
import * as models from '../models/index';

Meteor.startup(() => {
  if (markets.find().count() === 0) {
    let initialMarkets = [
      new models.market('EUR/USD', 'EUR_USD')
    ];

    for (m in initialMarkets) {
      markets.insert(m);
    }
  }
});
