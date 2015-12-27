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
  Meteor.publish('assets.list', () => repositories.assets.find({}));

  // import
  let etoroInstruments = new etoroImporter({
    ticker: 'SymbolFull',
    name: 'InstrumentDisplayName',
    icon: 'Images[0].Uri',
    type: 'ExchangeID'
  });

  // secure repositories
  secureRepositories();
}
