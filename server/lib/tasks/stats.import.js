import task from './task';
import * as repositories from '../../../lib/repositories/index';

import {
  default as csvImporter
}
from '../importers/csv';

import * as models from '../../../lib/models/index';

export default class statsTask extends task {
  constructor(...args) {
    super(...args);
  }

  add() {
    SyncedCron.add({
      name: this.name,
      schedule: parser => parser.text(this.schedule),
      job: () => {
        // currencies force
        let csvForce = new csvImporter(null, 'https://raw.githubusercontent.com/webpolis/qfx/master/private/data/force.csv');

        if (typeof csvForce[Symbol.iterator] === 'function') {
          repositories.statistics.remove({
            type: models.stat.types.currencyForce
          });

          for (let force of csvForce) {
            let currencies = Object.keys(force).filter((v) => {
              return v !== 'period'
            });

            for (let c of currencies) {
              try {
                let stat = new models.stat(c, force[c], models.stat.types.currencyForce, force.period);
                repositories.statistics.insert(stat);
              } catch (err) {}
            }
          }
        }
      }
    });
  }
}
