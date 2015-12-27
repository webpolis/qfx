import task from './task';
import * as repositories from '../../../lib/repositories/index';

import {
  default as etoroImporter
}
from '../importers/etoro';

export default class etoroTask extends task {
  constructor(...args) {
    super(...args);
  }

  add() {
    SyncedCron.add({
      name: this.name,
      schedule: parser => parser.text(this.schedule),
      job: () => {
        if (repositories.assets.find().count() === 0) {
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
        }
      }
    });
  }
}
