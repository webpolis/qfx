import * as repositories from '../../lib/repositories/index';
import {
  default as secureRepositories
}
from './security';
import {
  default as etoroImporter
}
from './importers/etoro';

export default function init() {
  // publish
  Meteor.publish('assets.list', () => repositories.assets.find({
    active: true
  }));

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
      repositories.assets.insert(ei);
    } catch (err) {}
  }

  // secure repositories
  secureRepositories();
}
