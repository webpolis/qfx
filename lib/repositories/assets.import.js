export default assets = new Mongo.Collection('assets');
import * as models from '../models/index';

Meteor.startup(() => {
  if (Meteor.isServer) {
    assets._ensureIndex({
      name: 1,
      ticker: 1
    }, {
      unique: 1
    });
    let csvConfig = {
      header: true,
      dynamicTyping: true,
      encoding: 'UTF-8',
      skipEmptyLines: true
    };

    // import crosses
    let csvCrosses = Assets.getText('data/availableCrosses.csv');
    let crosses = Baby.parse(csvCrosses, csvConfig);

    for (let cross of crosses.data) {
      let c = new models.cross(cross.displayName, cross.instrument);
      assets.insert(c);
    }

    // import stocks
    let csvStocks = Assets.getText('data/stocksPortfolio.csv');
    let stocks = Baby.parse(csvStocks, csvConfig);

    for (let stock of stocks.data) {
      let s = new models.stock(stock.cross, stock.cross);
      assets.insert(s);
    }
  }
});
