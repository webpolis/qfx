export default assets = new Mongo.Collection('assets');
import * as models from '../models/index';

Meteor.startup(() => {
  if (Meteor.isServer) {
    // clear repositories
    assets.remove({});

    // import crosses
    let csvCrosses = Assets.getText('data/availableCrosses.csv');
    let crosses = Baby.parse(csvCrosses, {
      header: true
    });

    for (let cross of crosses.data) {
      let c = new models.cross(cross.displayName, cross.instrument);
      assets.insert(c);
    }
  }
});
