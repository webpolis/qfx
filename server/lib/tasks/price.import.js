import task from './task';
import * as repositories from '../../../lib/repositories/index';

import {
  default as priceImporter
}
from '../importers/price';

export default class priceTask extends task {
  constructor(...args) {
    super(...args);
  }

  add() {
    let instruments = repositories.assets.find({
      type: 'cross',
      active: true
    }, {
      fields: {
        ref: 1
      }
    }).fetch().map((e) => e.ref).join(',');

    SyncedCron.add({
      name: this.name,
      schedule: parser => parser.text(this.schedule),
      job: () => {
        // import prices via etoro
        let prices = new priceImporter({
          value: '@Prices.slice(-1)[0].Price',
          time: '@Prices.slice(-1)[0].ToTime',
          ref: 'InstrumentId'
        }, `https://www.etoro.com/sapi/candles/quickcharts.json/today/24?client_request_id=2f5eb542-c554-4ff0-9f68-64b142bceae3&instruments=[${instruments}]`);

        repositories.prices.remove({});

        for (let price of prices) {
          try {
            repositories.prices.insert(price);
          } catch (err) {}
        }
      }
    });
  }
}
