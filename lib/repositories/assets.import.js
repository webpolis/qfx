export default assets = new Mongo.Collection('assets');
import * as models from '../models/index';

import {
  default as etoroImporter
}
from '../importers/etoro';

Meteor.startup(() => {
  if (Meteor.isServer) {
    assets._ensureIndex({
      name: 1,
      ticker: 1
    }, {
      unique: 1
    });

    if (assets.find().count() === 0) {
      // import assets
      let etoroInstruments = new etoroImporter({
        ticker: 'SymbolFull',
        name: 'InstrumentDisplayName',
        icon: '@Images[0].Uri',
        type: 'ExchangeID',
        ref: 'InstrumentID'
      }, 'https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments');

      for (let ei of etoroInstruments) {
        try {
          assets.insert(ei);
        } catch (err) {}
      }
    }
  }
});
