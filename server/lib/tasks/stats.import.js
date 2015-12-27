import task from './task';

import {
  default as csvImporter
}
from '../importers/csv';

export default class statsTask extends task {
  constructor(...args) {
    super(...args);
  }

  add() {
    SyncedCron.add({
      name: this.name,
      schedule: parser => parser.text(this.schedule),
      job: () => {
        let csvForce = new csvImporter(null, 'https://raw.githubusercontent.com/webpolis/qfx/master/private/data/force.csv');

        for (let force of csvForce) {
          console.log(force);
        }
      }
    });
  }
}
