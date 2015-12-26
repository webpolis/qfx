export default assets = new Mongo.Collection('assets');
import * as models from '../models/index';

Meteor.startup(() => {
  if (assets.find().count() === 0) {
    let initialAssets = [
      new models.asset('EUR/USD', 'EUR_USD')
    ];

    for (let m of initialAssets) {
      assets.insert(m);
    }
  }
});
